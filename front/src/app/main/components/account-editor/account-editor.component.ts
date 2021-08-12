import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, from, Subscription } from 'rxjs';
import { debounceTime, map, mergeMap } from 'rxjs/operators';
import { IconService } from 'src/app/base/electron/emitter/icon.service';
import { OuterAccountRepository } from 'src/app/base/repositories/outer-account.repository';
import { AutoUnsubscribe } from 'src/app/utils/autoUnsubscribe.decorator';
import { genPassword } from 'src/app/utils/password';
import { OuterAccount, UserAccount } from 'src/models';

@Component({
  selector: 'app-account-editor',
  templateUrl: './account-editor.component.html',
  styleUrls: ['./account-editor.component.scss'],
})
@AutoUnsubscribe
export class AccountEditorComponent implements OnInit {
  iconSubject = new BehaviorSubject('');
  subscription = new Subscription();

  form = new FormGroup({
    passwordLength: new FormControl(8),
    isGeneratePassword: new FormControl(false),
    outerAccount: new FormGroup({
      providerName: new FormControl(''),
      userId: new FormControl(''),
      password: new FormControl(''),
      link: new FormControl(''),
      iconPath: new FormControl(''),
    }),
    check: new FormGroup({
      lowercase: new FormControl(true),
      uppercase: new FormControl(true),
      numeric: new FormControl(true),
      symbol: new FormControl(true),
    }),
  });
  get passwordLength() {
    return this.form.get('passwordLength');
  }
  get isGeneratePassword() {
    return this.form.get('isGeneratePassword');
  }
  get outerAccount() {
    return this.form.get('outerAccount');
  }
  get check() {
    return this.form.get('check');
  }

  editing$ = new BehaviorSubject(false);
  creating$ = new BehaviorSubject(false);

  disabled$ = combineLatest([this.editing$, this.creating$]).pipe(
    map(([e, c]) => {
      return !e && !c;
    })
  );

  constructor(
    private dialogRef: MatDialogRef<AccountEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { outerAccountID?: string; userAccount: UserAccount },
    private outerAccountRepository: OuterAccountRepository,
    private iconService: IconService
  ) {}

  ngOnInit() {
    this.subscription
      .add(
        this.disabled$.subscribe((d) => {
          if (d) {
            this.outerAccount?.get('providerName')?.disable();
            this.outerAccount?.get('userId')?.disable();
            this.outerAccount?.get('password')?.disable();
            this.outerAccount?.get('link')?.disable();
          } else {
            this.outerAccount?.get('providerName')?.enable();
            this.outerAccount?.get('userId')?.enable();
            this.outerAccount?.get('password')?.enable();
            this.outerAccount?.get('link')?.enable();
          }
        })
      )
      .add(
        this.iconSubject
          .pipe(
            debounceTime(1000),
            mergeMap((v) => {
              return from(
                this.iconService.getFromUrl(v).catch(() => {
                  return '';
                })
              );
            })
          )
          .subscribe((v) => {
            this.outerAccount?.patchValue({
              ...this.outerAccount?.value,
              iconPath: v,
            });
          })
      );

    if (this.data.outerAccountID) {
      this.outerAccountRepository.get(this.data.outerAccountID).then((outerAccount) => {
        if (outerAccount) {
          this._parseOuterAccountToProperty(outerAccount);
        }
      });
    } else {
      this.creating$.next(true);
    }
  }

  toggleEdit(): void {
    this.editing$.next(!this.editing$.value);
    if (this.data.outerAccountID) {
      this.outerAccountRepository.get(this.data.outerAccountID).then((outerAccount) => {
        if (outerAccount) {
          this._parseOuterAccountToProperty(outerAccount);
        }
      });
    }
  }

  copyPassword() {
    navigator.clipboard.writeText(this.outerAccount?.get('password')?.value).then(() => {
      alert('パスワードをコピーしました');
    });
  }

  generatePassword() {
    this.outerAccount?.patchValue({
      ...this.outerAccount?.value,
      password: genPassword(this.passwordLength?.value, this.check?.value),
    });
  }
  private _parseOuterAccountToProperty(outerAccount: OuterAccount): void {
    this.outerAccount?.patchValue({
      providerName: outerAccount.providerName,
      userId: outerAccount.userId,
      password: outerAccount.password,
      link: outerAccount.link,
      iconPath: outerAccount.iconPath,
    });
    this.iconSubject.next(outerAccount.link);
  }

  onChangeLink(v: string): void {
    if (v !== this.iconSubject.value) this.iconSubject.next(v);
  }

  async save(): Promise<void> {
    if (this.creating$.value) {
      this._create();
    } else {
      this._update();
    }
  }
  private async _update(): Promise<void> {
    if (this.data.outerAccountID) {
      const outerAccount = await this.outerAccountRepository.get(this.data.outerAccountID);
      if (outerAccount) {
        await this.outerAccountRepository.update(outerAccount, (v) => {
          v.userAccount = this.data.userAccount;
          Object.assign(v, this.outerAccount?.value);
        });

        this.toggleEdit();
      }
    }
  }
  private async _create(): Promise<void> {
    await this.outerAccountRepository.create(
      new OuterAccount({
        ...this.outerAccount?.value,
        userAccount: this.data.userAccount,
      })
    );

    this.dialogRef.close();
  }

  async destroyAccount(): Promise<void> {
    if (this.data.outerAccountID) {
      const outerAccount = await this.outerAccountRepository.get(this.data.outerAccountID);
      if (outerAccount) {
        await this.outerAccountRepository.destroy(outerAccount);
        this.dialogRef.close();
      }
    }
  }
}

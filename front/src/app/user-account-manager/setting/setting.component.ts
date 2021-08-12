import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, from } from 'rxjs';
import { filter, mergeMap, pluck } from 'rxjs/operators';
import { InputComponent } from 'src/app/base/components/input/input.component';
import { KeyService } from 'src/app/base/electron/emitter/key.service';
import { UserAccountService } from 'src/app/base/models/userAccount.service';
import { UserAccountRepository } from 'src/app/base/repositories/user-account.repository';
import { UserAccount } from 'src/models';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  name = new FormControl('');
  model!: UserAccount;

  @ViewChild('input') input!: InputComponent;

  editing$ = new BehaviorSubject(false);
  hasKey = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private keyService: KeyService,
    private userAccountRepository: UserAccountRepository,
    private userAccountService: UserAccountService
  ) {}
  ngOnInit(): void {
    this.editing$.subscribe((e) => {
      if (e) this.name.enable();
      else this.name.disable();
    });
    this.activatedRoute.params
      .pipe(
        pluck('id'),
        mergeMap((id) => from(this.userAccountRepository.get(id))),
        filter((v): v is UserAccount => !!v)
      )
      .subscribe({
        next: (v): void => {
          this.name.setValue(v.name);
          this.model = v;
          this.userAccountService.hasKey(this.model).then((v) => {
            this.hasKey = v;
          });
        },
      });
  }

  onClickEdit(): void {
    if (this.editing$.value && this.model) {
      this.userAccountRepository.update(this.model, (model) => {
        model.name = this.name.value;
      });
    }
    this.editing$.next(!this.editing$.value);
    setTimeout(() => {
      this.input.focus();
    }, 0);
  }

  _DeleteAccount(): void {
    this.userAccountRepository.destroy(this.model);
  }

  clickExport() {
    this.keyService.export(this.model.id);
  }
  clickImport() {
    this.keyService.import(this.model.id);
  }
}

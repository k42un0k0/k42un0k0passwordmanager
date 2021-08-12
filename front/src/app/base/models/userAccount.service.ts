import { Injectable } from '@angular/core';
import { KeyService } from 'src/app/base/electron/emitter/key.service';
import { UserAccount } from 'src/models';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  constructor(private keyService: KeyService) {}

  hasKey(userAccount: UserAccount): Promise<boolean> {
    return this.keyService.find(userAccount.id).then((v) => !!v);
  }
}

import { Injectable } from '@angular/core';
import { MutableModel } from '@aws-amplify/datastore';
import { CipherService } from 'src/app/base/electron/emitter/cipher.service';
import { KeyService } from 'src/app/base/electron/emitter/key.service';
import { OuterAccount } from 'src/models';

@Injectable({
  providedIn: 'root',
})
export class OuterAccountService {
  constructor(private keyService: KeyService, private cipherService: CipherService) {}
  async encrypt(model: OuterAccount) {
    return OuterAccount.copyOf(model, await this.encryptMutator(model.password, model.userAccount.id));
  }

  async encryptMutator(password: string, userAccountID: string) {
    const key = await this.keyService.find(userAccountID);
    if (key == null) throw new Error('aaaa');
    const encryptedPassword = this.cipherService.cipher(key, password);
    return (d: MutableModel<OuterAccount>) => {
      d.password = encryptedPassword;
    };
  }

  async decrypt(model: OuterAccount) {
    const key = await this.keyService.find(model.userAccount.id);
    if (key == null) throw new Error('aaaa');
    const decryptedPassword = this.cipherService.decipher(key, model.password);
    return OuterAccount.copyOf(model, (d) => {
      d.password = decryptedPassword;
    });
  }
}

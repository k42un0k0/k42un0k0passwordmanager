import { Injectable } from '@angular/core';
import { AbstractRepository } from './abstract.repository';
import { KeyService } from 'src/app/base/electron/emitter/key.service';
import { UserAccount } from 'src/models';

@Injectable({
  providedIn: 'root',
})
export class UserAccountRepository extends AbstractRepository<UserAccount> {
  constructor(private keyService: KeyService) {
    super(UserAccount);
  }

  async create(model: UserAccount) {
    await this.save(model);
    await this.keyService.create(model.id);
  }
}

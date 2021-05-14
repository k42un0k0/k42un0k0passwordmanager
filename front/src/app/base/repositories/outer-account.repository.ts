import { Injectable } from '@angular/core';
import { MutableModel } from '@aws-amplify/datastore';
import { AbstractRepository } from './abstract.repository';
import { OuterAccountService } from 'src/app/base/models/outerAccount.service';
import { OuterAccount } from 'src/models';

@Injectable({
  providedIn: 'root',
})
export class OuterAccountRepository extends AbstractRepository<OuterAccount> {
  constructor(private outerAccount: OuterAccountService) {
    super(OuterAccount);
  }

  async create(model: OuterAccount): Promise<OuterAccount> {
    return this.save(await this.outerAccount.encrypt(model));
  }

  async update(model: OuterAccount, mutator: (draft: MutableModel<OuterAccount>) => void): Promise<OuterAccount> {
    return this.save(OuterAccount.copyOf(model, mutator));
  }

  async get(id: string): Promise<OuterAccount | undefined> {
    return super
      .get(id)
      .then((v) => {
        console.log(v);
        return v;
      })
      .then((model) => (model ? this.outerAccount.decrypt(model) : model));
  }
}
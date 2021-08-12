import { Component } from '@angular/core';
import { ElectronService } from 'src/app/base/electron/emitter/electron.service';
import { UserAccountRepository } from 'src/app/base/repositories/user-account.repository';

@Component({
  selector: 'app-user-account-manager',
  templateUrl: './user-account-manager.component.html',
  styleUrls: ['./user-account-manager.component.scss'],
})
export class UserAccountManagerComponent {
  userAccounts = this.userAccountRepository.list;

  constructor(private userAccountRepository: UserAccountRepository, private electronService: ElectronService) {}

  closeWindow(): void {
    this.electronService.close();
  }
}

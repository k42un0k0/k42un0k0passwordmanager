import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserAccountManagerComponent } from './user-account-manager.component';
import { ElectronService } from 'src/app/base/electron/emitter/electron.service';

import { UserAccountRepository } from 'src/app/base/repositories/user-account.repository';
import { TestModule } from 'src/app/test/test.module';

describe('UserAccountManagerComponent', () => {
  let component: UserAccountManagerComponent;
  let fixture: ComponentFixture<UserAccountManagerComponent>;

  beforeEach(async () => {
    const mockUserAccountRepository: any = {};
    const mockElectronService: any = {};
    mockUserAccountRepository.userAccounts = of([]);
    await TestBed.configureTestingModule({
      declarations: [UserAccountManagerComponent],
      providers: [
        { provide: UserAccountRepository, useValue: mockUserAccountRepository },
        { provide: ElectronService, useValue: mockElectronService },
      ],
      imports: [RouterTestingModule, MatIconModule, MatButtonModule, TestModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

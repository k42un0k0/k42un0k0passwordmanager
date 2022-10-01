import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { ComponentsModule } from './components/components.module';

import { MainComponent } from './main.component';
import { UserAccountService } from 'src/app/base/models/userAccount.service';
import { OuterAccountRepository } from 'src/app/base/repositories/outer-account.repository';
import { UserAccountRepository } from 'src/app/base/repositories/user-account.repository';
import { TestModule } from 'src/app/test/test.module';

describe('main/MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  Object.defineProperty(document, 'defaultView', {
    get() {
      window.main = { ipcRenderer: { on() {}, removeListener() {} } } as any;
      return window;
    },
  });
  beforeEach(async () => {
    const mock: any = {};
    mock.list = of([]);

    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [{ provide: UserAccountRepository, useValue: mock }],
      imports: [ComponentsModule, RouterTestingModule, MatIconModule, MatButtonModule, MatDialogModule, TestModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

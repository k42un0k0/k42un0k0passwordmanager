import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ElectronService } from 'src/app/base/electron/emitter/electron.service';
import { AuthenticationService } from 'src/app/base/services/authentication.service';
import { WindowService } from 'src/app/base/services/window.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  password = '';
  username = '';

  error = '';

  constructor(
    private authenticationService: AuthenticationService,
    private elm: ElementRef,
    private windowService: WindowService,
    private electronService: ElectronService
  ) {}

  ngAfterViewInit(): void {
    this.windowService.resizeTo(this.elm);
  }

  async submit(e: Event): Promise<void> {
    e.preventDefault();
    try {
      await this.authenticationService.signIn({ username: this.username, password: this.password });
      await this.electronService.main();
      this.electronService.close();
    } catch (e) {
      if (e.code === 'InvalidParameterException') {
        this.error = 'Incorrect User ID or Password';
      } else {
        this.error = e.message;
      }
    }
  }
}

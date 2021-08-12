import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'src/app/base/electron/emitter/electron.service';
import { AuthenticationService } from 'src/app/base/services/authentication.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
})
export class InitialComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private electronService: ElectronService) {}

  ngOnInit(): void {
    this.authenticationService.isSignedIn.subscribe((isSignedIn) => {
      (async () => {
        if (isSignedIn) {
          await this.electronService.main();
        } else {
          await this.electronService.auth();
        }
        this.electronService.close();
      })();
    });
  }
}

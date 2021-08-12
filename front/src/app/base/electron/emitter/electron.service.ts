import { Injectable } from '@angular/core';
import { IWindowService } from 'lib';

@Injectable({
  providedIn: 'root',
})
export class ElectronService extends IWindowService {
  constructor(private window: Window) {
    super();
  }
  close(): Promise<void> {
    return this.window.main.windowService.close();
  }

  main(): Promise<void> {
    return this.window.main.windowService.main();
  }

  userAccountManager(): Promise<void> {
    return this.window.main.windowService.userAccountManager();
  }

  auth(): Promise<void> {
    return this.window.main.windowService.auth();
  }
}

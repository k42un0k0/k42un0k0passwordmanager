import * as url from 'url';
import { MyWindow } from './my-window';
import { frontPath, preloadPath } from 'src/constant';

export class UserAccountManagerWindow extends MyWindow {
  url(): string {
    return `${
      process.env.ELECTRON_START_URL ??
      url.format({
        pathname: frontPath,
        protocol: 'file:',
        slashes: true,
      })
    }#/user-account-manager`;
  }

  protected config(): Electron.BrowserWindowConstructorOptions {
    return {
      width: 800,
      height: 600,
      webPreferences: {
        preload: preloadPath,
      },
      frame: false,
      backgroundColor: '#333',
    };
  }
}

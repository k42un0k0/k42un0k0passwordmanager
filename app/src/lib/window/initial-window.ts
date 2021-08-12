import * as url from 'url';
import { MyWindow } from './my-window';
import { frontPath, preloadPath } from 'src/constant';

export class InitialWindow extends MyWindow {
  config(): Electron.BrowserWindowConstructorOptions {
    return {
      width: 400,
      height: 300,
      webPreferences: {
        preload: preloadPath,
      },
      show: false,
      frame: false,
      resizable: false,
      backgroundColor: '#333',
    };
  }

  url(): string {
    return `${
      process.env.ELECTRON_START_URL ??
      url.format({
        pathname: frontPath,
        protocol: 'file:',
        slashes: true,
      })
    }#/initial`;
  }
}

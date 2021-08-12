import * as url from 'url';
import { MyWindow } from './my-window';
import { frontPath, preloadPath } from 'src/constant';
import { UpdateMessageService } from 'src/lib/emitter/update-message.service';

export class MainWindow extends MyWindow {
  constructor() {
    super();
    this.addEmitter(new UpdateMessageService(this.win));
  }

  protected url(): string {
    return `${
      process.env.ELECTRON_START_URL ??
      url.format({
        pathname: frontPath,
        protocol: 'file:',
        slashes: true,
      })
    }#/`;
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

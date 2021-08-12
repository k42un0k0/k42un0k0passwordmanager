import type { BrowserWindow } from 'electron';
import { CHANNELS, IUpdateMessageService } from 'lib';
import type { Emitter } from 'src/lib/emitter/emitter';

export class UpdateMessageService extends IUpdateMessageService implements Emitter {
  win: BrowserWindow;

  constructor(_win: BrowserWindow) {
    super();
    this.win = _win;
  }

  onProgress(percent: number): void {
    this.win.webContents.send(CHANNELS.updateMessageService.onProgress, percent);
  }
}

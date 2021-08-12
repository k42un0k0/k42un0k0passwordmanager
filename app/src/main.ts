import path from 'path';
import { app as electronApp } from 'electron';
import logger from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { listener } from './lib/listener/listener';
import { registerAutoReload } from './lib/reload';
import { ipcService, windowManager } from './lib/singleton';
import { UpdateMessageService } from 'src/lib/emitter/update-message.service';

logger.transports.file.level = 'info';
autoUpdater.logger = logger;

// function windowIsNone(): boolean {
//   return BrowserWindow.getAllWindows().length === 0;
// }
function main(): void {
  if (!electronApp.isPackaged) registerAutoReload(path.join(__dirname, '..'));

  ipcService.addEventListener(listener);
  void electronApp.whenReady().then(() => {
    windowManager.initializeWindow();
  });

  autoUpdater.signals.progress((progressObj) => {
    windowManager.getEmitters(UpdateMessageService).forEach((u) => {
      u.onProgress(progressObj.percent);
    });
  });

  // macではウィンドウが閉じてもアプリが残るため、マニュアルで閉じる
  electronApp.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      electronApp.quit();
    }
  });

  // 多重起動しようとしたらfocusする
  electronApp.on('second-instance', () => {
    electronApp.focus();
  });

  // TODO: 用途がわからないためコメントアウト
  // electronApp.on('activate', () => {
  //   if (windowIsNone()) {
  //     windowManager.initializeWindow();
  //   }
  // });
}

const gotTheLock = electronApp.requestSingleInstanceLock();

if (!gotTheLock) {
  electronApp.quit();
} else {
  main();
}

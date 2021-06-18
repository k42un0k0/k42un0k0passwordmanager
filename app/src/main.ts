import path from 'path';
import { app as electronApp, BrowserWindow } from 'electron';
import { listener } from './listener';
import { registerAutoReload } from './reload';
import { ipcService, windowManager } from './singleton';

function main(): void {
  if (!electronApp.isPackaged) registerAutoReload(path.join(__dirname, '..'));

  ipcService.addEventListener(listener);
  void electronApp.whenReady().then(() => {
    void windowManager.initializeWindow();
  });

  electronApp.on('browser-window-created', (_, browserWindow) => {
    windowManager.windowMap.set(browserWindow.id, browserWindow);
  });

  electronApp.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      electronApp.quit();
    }
  });

  electronApp.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void windowManager.initializeWindow();
    }
  });
}

main();

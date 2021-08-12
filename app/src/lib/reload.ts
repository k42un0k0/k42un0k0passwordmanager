/* eslint-disable */
/**
 * You need to install chokider
 *
 *    npm install chokider
 */
import type { BrowserWindow } from 'electron';
import { app } from 'electron';

/**
 * Register app-relaunch handler when source file is changed.
 *
 * Call this method at the beginning of the main process.
 *
 * @example if main.js is at the root of the build directory, configuration is as follows
 *
 *      registerAutoReload(__dirname, __filename);
 *
 * @param srcRoot absolute path of source file root directory.
 *                All file changes under this directory are watched.
 * @param mainFilePath absolute path of electron main.js file
 */
export function registerAutoReload(srcRoot: string): void {
  const chokidar = require('chokidar');
  const browserWindows: BrowserWindow[] = [];

  app.on('browser-window-created', (_, browserWindow) => {
    browserWindows.push(browserWindow);

    browserWindow.on('closed', () => {
      browserWindows.splice(browserWindows.indexOf(browserWindow), 1);
    });
  });

  // eslint-disable-next-line @typescript-eslint/init-declarations
  let timer: NodeJS.Timeout;
  chokidar.watch(srcRoot).on('change', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      app.relaunch();
      app.quit();
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 1000);
  });
}

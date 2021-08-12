import { CHANNELS } from 'lib';
import type { IpcListenerMap } from 'src/lib/ipc.service';
import { cipherService, iconService, ipcService, keyService, windowManager } from 'src/lib/singleton';
import { AuthWindow } from 'src/lib/window/auth-window';
import { MainWindow } from 'src/lib/window/main-window';
import { UserAccountManagerWindow } from 'src/lib/window/user-account-manager-window';

const windowManagerListener: IpcListenerMap = {
  [CHANNELS.windowService.close]: (e) => {
    windowManager.closeWindow(e.sender.id);
  },
  [CHANNELS.windowService.auth]: async () => windowManager.createWindow(AuthWindow),
  [CHANNELS.windowService.main]: async () => windowManager.createWindow(MainWindow),
  [CHANNELS.windowService.userAccountManager]: async () => windowManager.createWindow(UserAccountManagerWindow),
};

const iconSerciseListener = ipcService.createListhenerMap(CHANNELS.iconService, iconService);
const keySerciseListener = ipcService.createListhenerMap(CHANNELS.keyService, keyService);
const cipherSerciseListener = ipcService.createListhenerMap(CHANNELS.cipherService, cipherService, {
  syncFunc: ['cipher', 'decipher'],
});

export const listener = {
  ...windowManagerListener,
  ...keySerciseListener,
  ...iconSerciseListener,
  ...cipherSerciseListener,
};

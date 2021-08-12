/// <reference types="electron" />
declare interface Window {
  main: {
    windowService: {
      close(): Promise<void>;
      auth(): Promise<void>;
      userAccountManager(): Promise<void>;
      main(): Promise<void>;
    };
    ipcRenderer: {
      invoke: Electron.IpcRenderer['invoke'];
      sendSync: Electron.IpcRenderer['sendSync'];
      on: Electron.IpcRenderer['on'];
      removeListener: Electron.IpcRenderer['removeListener'];
    };
  };
}

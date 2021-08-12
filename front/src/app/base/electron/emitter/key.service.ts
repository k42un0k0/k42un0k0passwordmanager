import { Injectable } from '@angular/core';
import { CHANNELS, IKeyService } from 'lib';

@Injectable({
  providedIn: 'root',
})
export class KeyService extends IKeyService {
  constructor(private window: Window) {
    super();
  }
  find(userAccountID: string): Promise<string | null> {
    return this.window.main.ipcRenderer.invoke(CHANNELS.keyService.find, userAccountID);
  }
  create(userAccountID: string): Promise<string> {
    return this.window.main.ipcRenderer.invoke(CHANNELS.keyService.create, userAccountID);
  }
  set(userAccountID: string): Promise<void> {
    return this.window.main.ipcRenderer.invoke(CHANNELS.keyService.set, userAccountID);
  }
  export(userAccountID: string): Promise<void> {
    return this.window.main.ipcRenderer.invoke(CHANNELS.keyService.export, userAccountID);
  }
  import(userAccountID: string): Promise<void> {
    return this.window.main.ipcRenderer.invoke(CHANNELS.keyService.import, userAccountID);
  }
}

import { Injectable } from '@angular/core';
import { CHANNELS, ICipherService } from 'lib';

@Injectable({
  providedIn: 'root',
})
export class CipherService extends ICipherService {
  constructor(private window: Window) {
    super();
  }
  cipher(key: string, plaintext: string): string {
    return this.window.main.ipcRenderer.sendSync(CHANNELS.cipherService.cipher, key, plaintext);
  }
  decipher(key: string, encryptedData: string): string {
    return this.window.main.ipcRenderer.sendSync(CHANNELS.cipherService.decipher, key, encryptedData);
  }
}

import { Injectable } from '@angular/core';
import { CHANNELS, IIconService } from 'lib';

@Injectable({
  providedIn: 'root',
})
export class IconService extends IIconService {
  constructor(private window: Window) {
    super();
  }
  getFromUrl(url: string): Promise<string> {
    return this.window.main.ipcRenderer.invoke(CHANNELS.iconService.getFromUrl, url);
  }
}

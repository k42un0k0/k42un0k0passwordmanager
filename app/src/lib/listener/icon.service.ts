import axios from 'axios';
import jsdom from 'jsdom';
import { IIconService } from 'lib';

export class IconService extends IIconService {
  async getFromUrl(url: string): Promise<string> {
    const urlInstance = new URL(url);
    return (await this._fromDom(urlInstance)) ?? this._fromNoSetting(urlInstance);
  }

  private async _fromDom(url: URL): Promise<string | undefined> {
    const res = await axios.get(url.toString());
    const dom = new jsdom.JSDOM(res.data as string);
    const link = dom.window.document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]');
    if (link != null) {
      return new URL(link.href, url.origin).toString();
    }
  }

  private _fromNoSetting(url: URL): string {
    return url.origin + '/favicon.ico';
  }
}

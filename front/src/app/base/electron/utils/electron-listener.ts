import { Subscription, TeardownLogic } from 'rxjs';

type ToListener<T extends AnyObject> = { [P in keyof T]?: (...args: any[]) => void };
type ToChannels<T extends AnyObject> = { [P in keyof T]: string };

export class ElectronListener<T extends AnyObject = {}> {
  constructor(private window: Window) {}
  // ToListenerがプロパティをnullableにするため幽霊型っぽいものでプロパティを検査できるようにする
  private _phantom!: T;
  private listeners: ToListener<T> = {};
  listen<U extends AnyObject>(channels: ToChannels<U>, handler: U): ElectronListener<T & U> {
    const listeners = (Object.entries(channels) as [keyof ToChannels<U>, string][]).reduce((pre, [key, value]) => {
      const listener = (_: any, ...args: any[]): any => {
        let returnValue: any = undefined;
        returnValue = handler[key](...args);
        return returnValue;
      };

      pre[channels[key]] = listener;
      this.window.main.ipcRenderer.on(channels[key], listener);
      return pre;
    }, {} as ToListener<T & U>);
    this.listeners = listeners;
    return (this as unknown) as ElectronListener<T & U>;
  }
  unlisten() {
    Object.entries(this.listeners).forEach(([key, value]) => {
      if (value != null) this.window.main.ipcRenderer.removeListener(key, value);
    });
  }
}

import { BrowserWindow } from 'electron';
import type { Emitter } from 'src/lib/emitter/emitter';

export abstract class MyWindow {
  win: BrowserWindow;

  emitters: Emitter[] = [];

  constructor() {
    this.win = new BrowserWindow(this.config());
  }

  async load(): Promise<void> {
    return this.win.loadURL(this.url());
  }

  close(): void {
    this.win.close();
  }

  get id(): number {
    return this.win.id;
  }

  protected addEmitter(emitter: Emitter): void {
    this.emitters.push(emitter);
  }

  protected abstract config(): Electron.BrowserWindowConstructorOptions;

  protected abstract url(): string;
}

import type { BrowserWindow } from 'electron';

export interface Emitter {
  win?: BrowserWindow;
}
export type EmitterConstructor = new (win: BrowserWindow) => Emitter;

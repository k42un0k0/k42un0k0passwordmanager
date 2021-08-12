import type { CHANNELS } from '../channels';
import type { IpcService } from './ipc';

export abstract class IUpdateMessageService implements IpcService<typeof CHANNELS.updateMessageService> {
  abstract onProgress(percent: number): void;
}

import { IUpdateMessageService } from 'lib';

export class UpdateMessageService extends IUpdateMessageService {
  onProgress(percent: number): void {
    console.log('update message sevice', percent);
  }
}

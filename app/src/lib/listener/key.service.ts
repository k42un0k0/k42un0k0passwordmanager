import fs from 'fs';
import { dialog } from 'electron';
import { getPassword, setPassword } from 'keytar';
import { IKeyService } from 'lib';
import type { CipherService } from './cipher.service';

export class KeyService extends IKeyService {
  private readonly _service = 'k42un0k0passwordmanager';

  constructor(private readonly cipherService: CipherService) {
    super();
  }

  async find(userAccountID: string): Promise<string | null> {
    return getPassword(this._service, userAccountID);
  }

  async create(userAccountID: string): Promise<string> {
    const key = this.cipherService.generateKey();
    await setPassword(this._service, userAccountID, key);
    return key;
  }

  async set(userAccountID: string, key: string): Promise<void> {
    await setPassword(this._service, userAccountID, key);
  }

  async export(userAccountID: string): Promise<void> {
    const key = await this.find(userAccountID);
    const res = await dialog.showSaveDialog({ title: 'ファイルの保存', defaultPath: 'key.txt' });
    if (key == null || res.filePath == null || res.canceled) return;
    fs.writeFileSync(res.filePath, key, { encoding: 'utf8' });
  }

  async import(userAccountID: string): Promise<void> {
    const res = await dialog.showOpenDialog({ properties: ['openFile'] });
    if (res.filePaths.length !== 1 || res.canceled) return;
    const key = fs.readFileSync(res.filePaths[0], { encoding: 'utf8' });
    await this.set(userAccountID, key);
  }
}

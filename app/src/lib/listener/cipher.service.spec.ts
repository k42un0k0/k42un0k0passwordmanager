import { CipherService } from './cipher.service';

describe('CipherService', () => {
  let service: CipherService;
  beforeEach(() => {
    service = new CipherService();
  });

  it('do cipher', () => {
    const plaintext = 'k42un0k0passwordmanager';
    const key = service.generateKey();
    const encrypted = service.cipher(key, plaintext);
    const decrypted = service.decipher(key, encrypted);

    expect(encrypted).not.toBe(plaintext);
    expect(decrypted).toBe(plaintext);
  });

  it('do cipher with 日本語', () => {
    const plaintext = 'こんにちは、ジャヴァスクリプト';
    const key = service.generateKey();
    const encrypted = service.cipher(key, plaintext);
    const decrypted = service.decipher(key, encrypted);

    expect(encrypted).not.toBe(plaintext);
    expect(decrypted).toBe(plaintext);
  });

  it('throw error when descypt with invalid key', () => {
    const plaintext = 'k42un0k0passwordmanagaer';
    const key = service.generateKey();
    const invalidKey = service.generateKey();
    const encrypted = service.cipher(key, plaintext);

    expect(() => service.decipher(invalidKey, encrypted)).toThrow();
  });
});

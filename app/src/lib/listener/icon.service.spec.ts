import { IconService } from './icon.service';

describe('icon.service', () => {
  let service: IconService;
  beforeEach(() => {
    service = new IconService();
  });
  describe('getFromUrl', () => {
    it('get from link tag', async () => {
      expect(await service.getFromUrl('https://twitter.com/login')).toEqual(
        'https://abs.twimg.com/favicons/twitter.ico'
      );
    });
    it('compute favicon link', () => {
      void expect(service.getFromUrl('http://example.com/login')).rejects.toThrow();
    });
  });
});

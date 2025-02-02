import { createConnection } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';

describe('AppController', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
    await createConnection();
  });

  describe('root', () => {
    it('insert and get url', async () => {
      const longUrl = `https://github.com/kevenfeng${Date.now()}`;
      const shortUrl = await appService.insertUrl(longUrl);
      expect(shortUrl).not.toBeNull();

      const theLongUrl = await appService.findUrl(shortUrl);
      expect(theLongUrl).toBe(longUrl);
      
      const existLongUrl = 'https://github.com/kevenfengtest';
      const existshortUrl = await appService.insertUrl(existLongUrl);
      expect(existshortUrl).toBe('s.cn/zwXSVoIy');

      const errorShortUrl = 's.cn/zwXSVo1Iy';
      const theErrorLongUrl = await appService.findUrl(errorShortUrl);
      expect(theErrorLongUrl).toBe(null);
    });
  });
});

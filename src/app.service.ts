import { Injectable, Logger } from '@nestjs/common';
import { WebServiceClient } from '@maxmind/geoip2-node';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AppService {

  private webServiceLient: WebServiceClient;
  private readonly supportedLanguages = ['ru', 'he', 'en'];
  private readonly russianSpeakingCountries = new Set(['RU', 'UA', 'BY']);
  private readonly hebrewSpeakingCountries = new Set(['IL']);

  constructor(private readonly configService: ConfigService) {
    this.webServiceLient = new WebServiceClient(
      this.configService.get<string>('MAXMIND_ACCOUNT_ID'),
      this.configService.get<string>('MAXMIND_LICENSE_KEY')
    );
  }

  public async detectLanguage(req: Request): Promise<string> {
    Logger.log('Запустили процедуру определения языка.');
    // Получаем заголовок Accept-Language
    const acceptLanguage = req.headers['accept-language']?.toLowerCase();
    if (acceptLanguage) {
      const detectedLang = this.supportedLanguages.find((lang) => acceptLanguage.includes(lang));
      if (detectedLang) return detectedLang;
    };

    // Не удалось получить язык из заголовка, определяем по IP адресу.
    try {
      const ipAddress = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
        req.socket.remoteAddress || 'unknown';

      if (ipAddress === 'unknown' || ipAddress === '::1' || ipAddress === '127.0.0.1') {
        return 'en';
      };

      if (ipAddress.startsWith('127.') || ipAddress === '::1' || ipAddress.startsWith('::ffff:127.')) {
        return 'en';
      };

      const response = await this.webServiceLient.country(ipAddress);
      const isoCode = response?.country?.isoCode?.toUpperCase() || 'EN';

      if (this.russianSpeakingCountries.has(isoCode)) return 'ru';
      if (this.hebrewSpeakingCountries.has(isoCode)) return 'he';

    } catch (e) {
      Logger.error(e);
      return 'en';
    };

    // Не удалось получить язык ни одним из методов.
    Logger.warn(`Не удалось обнаружить язык пользователя.`);
    return 'en';
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { WebServiceClient } from '@maxmind/geoip2-node';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {

  private prisma = new PrismaClient();

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

  public async detectLocalization(req: Request): Promise<string> {
    
    // Получаем заголовок Accept-Language
    const acceptLanguage = req.headers['accept-language']?.toLowerCase();
    if (acceptLanguage) {
      const detectedLang = this.supportedLanguages.find((lang) => acceptLanguage.includes(lang));
      if (detectedLang) return detectedLang;
    };

    // Не удалось получить язык из заголовка, определяем по IP адресу.
    const ipAddress = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
      req.socket.remoteAddress || 'unknown';

    if (ipAddress === 'unknown' || ipAddress.startsWith('127.') || ipAddress === '::1' || ipAddress.startsWith('::ffff:127.') || ipAddress === '127.0.0.1') {
      return this.getDefaultLocalization();
    };

    try {
      const response = await this.webServiceLient.country(ipAddress);
      const isoCode = response?.country?.isoCode?.toUpperCase() || 'EN';

      if (this.russianSpeakingCountries.has(isoCode)) return 'ru';
      if (this.hebrewSpeakingCountries.has(isoCode)) return 'he';

    } catch (e) {
      Logger.error(e);
    };

    // Не удалось получить язык ни одним из методов.
    Logger.warn(`Не удалось обнаружить язык пользователя (acceptLanguage: ${acceptLanguage}, IP: ${ipAddress}).`);
    return this.getDefaultLocalization();
  }

  private async getDefaultLocalization(): Promise<string> {
    const defaultLocalizationId = 'en';
    const localization = await this.prisma.localization.findFirst({
      where: { isDefault: true }
    });
    if (!localization)
      Logger.warn(`В таблице localizations нет локализации, которая должна использоваться в качестве значения по умолчанию (возвращенное значение "${defaultLocalizationId}").`);
    return localization?.languageId || defaultLocalizationId;
  }
}

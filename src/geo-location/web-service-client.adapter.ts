import { WebServiceClient } from '@maxmind/geoip2-node';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WebServiceClientAdapter {
    private webServiceClient: WebServiceClient;
    private readonly supportedLanguages = ['ru', 'he', 'en'];
    private readonly russianSpeakingCountries = new Set(['RU', 'UA', 'BY']);
    private readonly hebrewSpeakingCountries = new Set(['IL']);
    
    constructor(
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService
    ) {
        this.webServiceClient = new WebServiceClient(
            this.configService.get<string>('MAXMIND_ACCOUNT_ID'),
            this.configService.get<string>('MAXMIND_LICENSE_KEY')
        );
    }

    public isLocaleSupported(lang: string): boolean {
        return this.supportedLanguages.includes(lang.toLowerCase());
    }

    public async getIpAddress(req: Request): Promise<string> {
        const ipAddress = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
    
        if (ipAddress === 'unknown' || ipAddress.startsWith('127.') || ipAddress === '::1' || ipAddress.startsWith('::ffff:127.') || ipAddress === '127.0.0.1') {
            Logger.warn(`Не удалось обнаружить IP пользователя. ${JSON.stringify({
                ipAddress,
                url: req.originalUrl,
                method: req.method
            })}`);
            return 'unknow'
        };
        return ipAddress;
    };

    public async detectLocalization(req: Request): Promise<string> {
        // Сначала пытаемся определить язык по accept-language
        const acceptLanguage = req.headers['accept-language']?.toLowerCase();
        if (acceptLanguage) {
            const detectedLang = this.supportedLanguages.find((lang) => acceptLanguage.includes(lang));
            if (detectedLang) return detectedLang;
        };

        const ipAddress = await this.getIpAddress(req);
        if (ipAddress === 'unknow')
            return this.getDefaultLocalization();
        
        try {
            const response = await this.webServiceClient.country(ipAddress);
            const isoCode = response?.country?.isoCode?.toUpperCase() || 'EN';
      
            if (this.russianSpeakingCountries.has(isoCode)) return 'ru';
            if (this.hebrewSpeakingCountries.has(isoCode)) return 'he';
        } catch (e) {
            Logger.error(e);
        };
        
        return this.getDefaultLocalization();
    }

    public async getDefaultLocalization(): Promise<string> {
        const defaultLocalizationId = 'en';
        const localization = await this.prismaService.locale.findFirst({
            where: { isDefault: true }
        });
        if (!localization)
            Logger.warn(`В таблице localizations нет локализации, которая должна использоваться в качестве значения по умолчанию (возвращенное значение "${defaultLocalizationId}").`);
        return localization?.languageId.toLocaleLowerCase() || defaultLocalizationId;
    }

    public async getCountry(ipAddress: string): Promise<string> {
        try {
            const response = await this.webServiceClient.country(ipAddress);
            return response?.country?.names?.en;
        } catch (e) {
            Logger.error(e);
        };
        return null;
    }

    public async getCity(ipAddress: string): Promise<string> {
        try {
            const response = await this.webServiceClient.city(ipAddress);
            return response?.city?.names?.en;
        } catch (e) {
            Logger.error(e);
        };
        return null;
    }

    public async getLocation(ipAddress: string): Promise<{
        country: string,
        city: string
    }> {
        try {
            const response = await this.webServiceClient.city(ipAddress);
            return {
                country: response?.country?.names?.en,
                city: response?.city?.names?.en
            };
        } catch (e) {
            Logger.error(e);
        };
        return null;
    }
}
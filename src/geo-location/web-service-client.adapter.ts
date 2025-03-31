import { WebServiceClient } from '@maxmind/geoip2-node';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class WebServiceClientAdapter {
    private webServiceClient: WebServiceClient;
    
    constructor(private readonly configService: ConfigService,) {
        this.webServiceClient = new WebServiceClient(
            this.configService.get<string>('MAXMIND_ACCOUNT_ID'),
            this.configService.get<string>('MAXMIND_LICENSE_KEY')
        );
    }

    public async getIpAddress(req: Request): Promise<string> {
        const ipAddress = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
    
        if (ipAddress === 'unknown' || ipAddress.startsWith('127.') || ipAddress === '::1' || ipAddress.startsWith('::ffff:127.') || ipAddress === '127.0.0.1') {
            Logger.warn(`Не удалось обнаружить IP пользователя. ${JSON.stringify({
                ipAddress,
                url: req.originalUrl,
                method: req.method
            })}`);
            throw new Error('Не удалось обнаружить IP пользователя.');
        };
        return ipAddress;
    };

    public async getCountry(ipAddress: string): Promise<string> {
        try {
            const response = await this.webServiceClient.country(ipAddress);
            return response?.country?.names?.en;
        } catch (e) {
            Logger.error(e);
        };
    }

    public async getCity(ipAddress: string): Promise<string> {
        try {
            const response = await this.webServiceClient.city(ipAddress);
            return response?.city?.names?.en;
        } catch (e) {
            Logger.error(e);
        };
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
    }
}
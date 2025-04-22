import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Excursion } from './entities/excursion.entity';

@Injectable()
export class ExcursionsService {

  constructor (private readonly prismaService: PrismaService) {}

  public async findAllLocalized(lang: string): Promise<Excursion[]> {
    const result = await this.findAll();
    const parseLocales = (locales: any): Record<string, string> => {
      try {
        if (typeof locales === 'string') {
          return JSON.parse(locales);
        } else if (locales && typeof locales === 'object') {
          return locales as Record<string, string>;
        }
        return {};
      } catch (error) {
        Logger.error(`Failed to parse locales:`, error);
        return {};
      }
    };
    return result.map(item => {
      const excursionLocales = parseLocales(item.displayNameLocales);
      const subtitleLocales = parseLocales(item.subtitleLocales);
      const descriptionLocales = parseLocales(item.descriptionLocales);

      return plainToInstance(Excursion, {
        ...item,
        displayName: excursionLocales[lang] || item.displayName,
        displayNameLocales: undefined,
        subtitle: subtitleLocales[lang] || item.subtitle,
        subtitleLocales: undefined,
        description: descriptionLocales[lang] || item.description,
        descriptionLocales: undefined
      });
    });
  };

  public async findAll(): Promise<Excursion[]> {
    const currentDate = new Date();
    const defaultCurrency = await this.prismaService.currency.findFirst({
      where: {
        isDefault: true
      }
    });

    const result = await this.prismaService.excursion.findMany({
      include: {
        product: {
          include: {
            prices: {
              select: {
                value: true,
                currencyId: true,
                priceMode: true
              },
              where: {
                priceType: 'sale',
                currencyId: defaultCurrency.id,
                startDate: { lte: currentDate },
                endDate: { gte: currentDate }
              },
              take: 1
            }
          }
        }
      },
      orderBy: {
        position: 'asc'
      }
    });

    return result.map(excursion => {
      const salesPrice = excursion.product.prices.length > 0
        ? {
            ...excursion.product.prices[0],
            value: excursion.product.prices[0].value ? Number(excursion.product.prices[0].value) : null
          } : null;
          
      return plainToInstance(Excursion, {
        ...excursion,
        salesPrice,
        product: undefined
      });
    });
  };
}
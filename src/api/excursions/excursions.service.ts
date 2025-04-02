import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Excursion } from './entities/excursion.entity';
import { ExcursionFeature } from './entities/excursion-feature.entity';
import { ExcursionInclusion } from './entities/excursion-inclusion.entity';
import { ExcursionSuggestion } from './entities/excursion-suggestion.entity';
import { Currency } from '../currencies/entities/currency.entity';

@Injectable()
export class ExcursionsService {

  constructor (private readonly prismaService: PrismaService) {}

  public async findAll(): Promise<Excursion[]> {
    const today = new Date();

    // Получаем ID валюты по умолчанию или используем 'ILS'
    const defaultCurrency = (await this.prismaService.currency.findFirst({
        where: { isDefault: true, deletedAt: null }
    }));

    // Запрашиваем экскурсии с вложенными данными
    const excursions = await this.prismaService.excursion.findMany({
      include: {
        product: {
          include: {
            prices: {
              where: {
                currencyId: defaultCurrency.id,
                priceType: 'sale',
                deletedAt: null,
                startDate: { lte: today },
                endDate: { gte: today },
              },
              take: 1
            }
          }
        },
        features: { orderBy: { position: 'asc' } },
        inclusions: { orderBy: { position: 'asc' } },
        suggestions: { orderBy: { position: 'asc' } }
      },
      orderBy: { position: 'asc' }
    });

    return excursions.map(excursion => {
      // Берем первую цену (если есть) и приводим к нужному формату
      const priceData = excursion.product?.prices?.[0] || null;
      const defaultPrice  = priceData
        ? {
          price: priceData.price.toNumber(),
          priceMode: priceData.priceMode,
          currency: defaultCurrency ? plainToInstance(Currency, defaultCurrency) : null
        }
          : null;

      // Преобразуем в экземпляры классов и убираем ненужное поле `product`
      return plainToInstance(Excursion, {
        ...excursion,
        defaultPrice,
        product: undefined,
        features: plainToInstance(ExcursionFeature, excursion.features),
        inclusions: plainToInstance(ExcursionInclusion, excursion.inclusions),
        suggestions: plainToInstance(ExcursionSuggestion, excursion.suggestions)
      });
    });
  }
}
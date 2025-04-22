import { Injectable, Logger } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductsService {

  constructor(private readonly prismaService: PrismaService) {}

  public async findAllLocalized(lang: string): Promise<Product[]> {
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

      const productLocales = parseLocales(item.displayNameLocales);
      const groupLocales = parseLocales(item.group?.displayNameLocales);
      
      return plainToInstance(Product, {
        ...item,
        displayName: productLocales[lang] || item.displayName,
        displayNameLocales: undefined,
        group: item.group ? {
          ...item.group,
          displayName: groupLocales[lang] || item.group.displayName,
          displayNameLocales: undefined
        } : null
      });

    });
  }

  public async findAll(): Promise<Product[]> {

    const currentDate = new Date();
    const defaultCurrency = await this.prismaService.currency.findFirst({
      where: {
        isDefault: true
      }
    });

    const result = await this.prismaService.product.findMany({
      include: {
        group: true,
        prices: {
          select: {
            value: true,
            currencyId: true,
            priceMode: true
          },
          where: {
            currencyId: defaultCurrency.id,
            priceType: 'sale',
            startDate: { lte: currentDate },
            endDate: { gte: currentDate }
          },
          take: 1
        }
      },
      orderBy: {
        position: 'asc'
      }
    });

    const fixPrice = result.map(product => {

      const salesPrice = product.prices.length > 0
        ? {
          ...product.prices[0],
          value: product.prices[0].value ? Number(product.prices[0].value) : null
        } : null
      
      return ({
      ...product,
      salesPrice,
      // prices: product.prices.map(price => ({
      //   ...price,
      //   value: price.value ? Number(price.value) : null
      // }))
      prices: undefined
    })});

    return plainToInstance(Product, fixPrice);
  }
}

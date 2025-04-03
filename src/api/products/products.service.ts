import { Injectable, Logger } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ProductsGroup } from '../products-groups/entities/products-group.entity';

@Injectable()
export class ProductsService {

  constructor(private readonly prismaService: PrismaService) {}

  public async findAllLocalized(lang: string): Promise<Product[]> {
    const result = await this.findAll();
    return result.map(item => {
      
      let locales: Record<string, string> = {};
      let desctiptionLocales: Record<string, string> = {};
      let groupDisplayNameLocales: Record<string, string> = {};

      try {
        
        if (typeof item.displayNameLocales === 'string') {
          locales = JSON.parse(item.displayNameLocales);
        } else if (item.displayNameLocales && typeof item.displayNameLocales === 'object') {
          locales = item.displayNameLocales as Record<string, string>;
        };
        
        if (typeof item.descriptionLocales === 'string') {
          desctiptionLocales = JSON.parse(item.descriptionLocales);
        } else if (item.descriptionLocales && typeof item.descriptionLocales === 'object') {
          desctiptionLocales = item.descriptionLocales as Record<string, string>;
        };

        if (item.group) {
          if (typeof item.group.displayNameLocales === 'string') {
            groupDisplayNameLocales = JSON.parse(item.group.displayNameLocales);
          } else if (item.group.displayNameLocales && typeof item.group.displayNameLocales === 'object') {
            groupDisplayNameLocales = item.group.displayNameLocales as Record<string, string>;
          };   
        };

      } catch (error) {
        Logger.error(`Failed to parse products for product ${item.id}:`, error);
      };

      const localizedGroup = item.group ? {
        ...item.group,
        displayName: groupDisplayNameLocales[lang] || item.group.displayName,
        displayNameLocales: undefined
      } : undefined;
      
      return plainToInstance(Product, {
        ...item,
        displayName: locales[lang] || item.displayName,
        displayNameLocales: undefined,
        description: desctiptionLocales[lang] || item.descriptionLocales,
        descriptionLocales: undefined,
        group: localizedGroup
      });
    });
  }

  public async findAll(): Promise<Product[]> {
    const result = await this.prismaService.product.findMany({
      include: {
        group: true,
        prices: true
      },
      orderBy: {
        position: 'asc'
      }
    });
        
    return result.map(product =>
      plainToInstance(Product, {
        ...product,
        group: product.group ? plainToInstance(ProductsGroup, product.group) : null
      })
    );
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Course } from './entities/course.entity';
import { CoursesGroup } from '../courses-groups/entities/courses-group.entity';
import { PriceType } from '@prisma/client';

@Injectable()
export class CoursesService {

  constructor (private readonly prismaService: PrismaService) {}

  public async findAllLocalized(lang: string): Promise<Course[]> {
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
      const courseLocales = parseLocales(item.displayNameLocales);
      const subtitleLocales = parseLocales(item.subtitleLocales);
      const descriptionLocales = parseLocales(item.descriptionLocales);
      const groupLocales = parseLocales(item.group?.displayNameLocales);

      return plainToInstance(Course, {
        ...item,
        displayName: courseLocales[lang] || item.displayName,
        displayNameLocales: undefined,
        subtitle: subtitleLocales[lang] || item.subtitle,
        subtitleLocales: undefined,
        description: descriptionLocales[lang] || item.description,
        descriptionLocales: undefined,
        group: item.group ? {
          ...item.group,
          displayName: groupLocales[lang] || item.group.displayName,
          displayNameLocales: undefined
        } : null
      });
    });
  }

  public async findAll(): Promise<Course[]> {

    const currentDate = new Date();
    const defaultCurrency = await this.prismaService.currency.findFirst({
      where: {
        isDefault: true
      }
    });
    
    const result = await this.prismaService.course.findMany({
      include: {
        group: true,
        product: {
          include: {
            prices: {
              select: {
                value: true,
                currencyId: true,
                priceMode: true
              },
              where: {
                priceType: PriceType.sale,
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
    
    return result.map(course => {
      const salesPrice = course.product.prices.length > 0
        ? {
          ...course.product.prices[0],
          value: course.product.prices[0].value ? Number(course.product.prices[0].value) : null
        } : null;
      
      return plainToInstance(Course, {
        ...course,
        salesPrice,
        group: course.group ? plainToInstance(CoursesGroup, course.group) : null,
        product: undefined
      });
    });
  }
}

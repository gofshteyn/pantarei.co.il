import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoursesGroup } from './entities/courses-group.entity';
import { PriceType } from '@prisma/client';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class CoursesGroupsService {

  constructor(private readonly prismaService: PrismaService) {}

  public async findAllLocalized(lang: string, expand?: string[]) {
    const result = await this.findAll(expand);
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
      const groupLocales = parseLocales(item.displayNameLocales);
      return plainToInstance(CoursesGroup, {
        ...item,
        displayName: groupLocales[lang] || item.displayName,
        displayNameLocales: undefined,
        courses: item.courses ? item.courses.map(course => {
          const courseLocales = parseLocales(course.displayNameLocales);
          const subtitleLocales = parseLocales(course.subtitleLocales);
          const descriptionLocales = parseLocales(course.descriptionLocales);
          
          return {
            ...course,
            displayName: courseLocales[lang] || course.displayName,
            displayNameLocales: undefined,
            subtitle: subtitleLocales[lang] || course.subtitle,
            subtitleLocales: undefined,
            description: descriptionLocales[lang] || course.description,
            descriptionLocales: undefined
          }
        }) : undefined
      });
    });
  }
  
  public async findAll(expand?: string[]): Promise<CoursesGroup[]> {

    const currentDate = new Date();
    const defaultCurrency = await this.prismaService.currency.findFirst({
      where: {
        isDefault: true
      }
    });

    let result;
    let include = expand?.includes('courses') ? {
      courses: {
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
                  priceType: PriceType.sale,
                  currencyId: defaultCurrency.id,
                  startDate: { lte: currentDate },
                  endDate: { gte: currentDate }
                },
                take: 1
              }
            }
          }
        }
      }
    } : null;
      
    result = await this.prismaService.coursesGroup.findMany({
      include,
      orderBy: {
        position: 'asc',
      },
    });

    return plainToInstance(CoursesGroup, result.map(group => ({
      ...group,
      courses: plainToInstance(Course, group.courses?.map(course => {
        const salePrice = course.product?.prices?.length > 0
          ? {
            ...course.product.prices[0],
            value: course.product.prices[0].value ? Number(course.product.prices[0].value) : null
          } : null;
        return {
          ...course,
          salePrice,
          product: undefined
        };
      }))
    })) as []);
  }
}

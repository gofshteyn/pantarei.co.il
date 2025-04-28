import { ConsoleLogger, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoursesGroup } from './entities/courses-group.entity';
import { PriceType } from '@prisma/client';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class CoursesGroupsService {

  constructor(private readonly prismaService: PrismaService) {}

  public async findAllLocalized(lang: string, expand?: string[]) {
    return this.findAll(expand);
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

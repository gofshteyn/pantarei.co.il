import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoursesGroupsService {

  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(expand?: string[]) {

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
                  // Параметры не добавляются?
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
    
    return result;
  }
}

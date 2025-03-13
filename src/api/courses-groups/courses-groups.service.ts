import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoursesGroup } from './entities/courses-group.entity';
import { plainToInstance } from 'class-transformer';
import { Course } from '../courses/entities/course.entity';
import { CourseFeature } from '../courses/entities/course-feature.entity';
import { CourseInclusion } from '../courses/entities/course-inclusion.entity';
import { CourseSuggestion } from '../courses/entities/course-suggestion.entity';
import { Product } from '../products/entities/product.entity';
import { Currency } from '../currencies/entities/currency.entity';
import { take } from 'rxjs';

@Injectable()
export class CoursesGroupsService {

  constructor(private readonly prismaService: PrismaService) {}

  // create(createCoursesGroupDto: CreateCoursesGroupDto) {
  //   return 'This action adds a new coursesGroup';
  // }
  // : Promise<CoursesGroup[]>
  public async findAll(expand?: string[]) {

    const today = new Date();

    // Получаем ID валюты по умолчанию или используем 'ILS'
    const defaultCurrency = await this.prismaService.currency.findFirst({
      where: { isDefault: true, deletedAt: null },
    });

    const includeOptions: Record<string, object> = {};

    if (expand?.includes('courses'))
      includeOptions.courses = {
        include: {
          product: true,
          features: {
            orderBy: {
              position: 'asc'
            }
          },
          inclusions: {
            orderBy: {
              position: 'asc'
            }
          },
          suggestions: {
            orderBy: {
              position: 'asc'
            }
          }
        },
        orderBy: {
          position: 'asc'
        }
      };
    
    let result = await this.prismaService.coursesGroup.findMany({
      include: includeOptions,
      orderBy: {
        position: 'asc'
      }
    });

    return plainToInstance(CoursesGroup, result).map(group => {
      if (group.courses) {
        group.courses = plainToInstance(Course, group.courses).map(course => {
          course.features = plainToInstance(CourseFeature, course.features || []);
          course.inclusions = plainToInstance(CourseInclusion, course.inclusions || []);
          course.suggestions = plainToInstance(CourseSuggestion, course.suggestions || []);
          return {...course};
        });
      }
      return group;
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} coursesGroup`;
  // }

  // update(id: number, updateCoursesGroupDto: UpdateCoursesGroupDto) {
  //   return `This action updates a #${id} coursesGroup`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} coursesGroup`;
  // }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Course } from './entities/course.entity';
import { CoursesGroup } from '../courses-groups/entities/courses-group.entity';

@Injectable()
export class CoursesService {

  constructor (private readonly prismaService: PrismaService) {}

  public async findAll(): Promise<Course[]> {
    
    const result = await this.prismaService.course.findMany({
      include: {
        group: true
      },
      orderBy: {
        position: 'asc'
      }
    });
    
    return result.map(course =>
      plainToInstance(Course, {
        ...course,
        group: course.group ? plainToInstance(CoursesGroup, course.group) : null
      })
    );
  }
}

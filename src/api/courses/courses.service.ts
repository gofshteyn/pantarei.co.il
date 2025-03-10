import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Course } from './entities/course.entity';
import { CoursesGroup } from '../courses-groups/entities/courses-group.entity';

@Injectable()
export class CoursesService {

  constructor (private readonly prismaService: PrismaService) {}
  
  // public async create(createCourseDto: CreateCourseDto) {
  // }

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

  // findOne(id: number) {
  //   return `This action returns a #${id} course`;
  // }

  // update(id: number, updateCourseDto: UpdateCourseDto) {
  //   return `This action updates a #${id} course`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} course`;
  // }
}

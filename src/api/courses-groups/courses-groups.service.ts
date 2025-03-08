import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoursesGroup } from './entities/courses-group.entity';
import { plainToInstance } from 'class-transformer';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class CoursesGroupsService {

  constructor(private readonly prismaService: PrismaService) {}

  // create(createCoursesGroupDto: CreateCoursesGroupDto) {
  //   return 'This action adds a new coursesGroup';
  // }

  public async findAll(expand?: string[]): Promise<CoursesGroup[]> {

    const includeOptions: Record<string, boolean> = {};
    const includeCourses = expand?.includes('courses');
    includeOptions.courses = includeCourses;

    let result = await this.prismaService.coursesGroup.findMany({
      include: includeOptions,
      orderBy: {
        position: 'asc',
      }
    });

    let nresult = result.map(group => {
      const groupCopy = { ...group };

      if (includeCourses && group.courses)
        groupCopy.courses = group.courses.map(course => plainToInstance(Course, course));
      return groupCopy;
    });

    return plainToInstance(CoursesGroup, nresult);
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

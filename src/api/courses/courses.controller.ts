import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';

@Controller('api/courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // @Post()
  // create(@Body() createCourseDto: CreateCourseDto) {
  //   return this.coursesService.create(createCourseDto);
  // }

  @Get()
  public async findAll(): Promise<Course[]> {
    return await this.coursesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.coursesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
  //   return this.coursesService.update(+id, updateCourseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.coursesService.remove(+id);
  // }
}

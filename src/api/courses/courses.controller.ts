import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Request } from 'express';

@Controller('api/courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  public async findAll(@Req() req: Request): Promise<Course[]> {
    if (req.query?.lang && typeof req.query.lang === 'string')
      return this.coursesService.findAllLocalized(req.query.lang);
    return await this.coursesService.findAll();
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Logger, Req } from '@nestjs/common';
import { CoursesGroupsService } from './courses-groups.service';
import { CreateCoursesGroupDto } from './dto/create-courses-group.dto';
import { UpdateCoursesGroupDto } from './dto/update-courses-group.dto';
import { CoursesGroup } from './entities/courses-group.entity';
import { Request } from 'express';

@Controller('api/courses-groups')
export class CoursesGroupsController {
  constructor(private readonly coursesGroupsService: CoursesGroupsService) {}

  @Get()
  public async findAll(@Query('expand') expand: string, @Req() req: Request) {
    // Передача параметра ?expand=["courses", "prices"] - prices не реализовано. Берется актуальная цена продажи на сегодня.
    let expandArray = [];
    try {
      expandArray = expand ? JSON.parse(expand) : [];
    } catch (e) {
      expandArray = [];
      Logger.warn(`Пользователь передал параметр "expand" в неверном формате (${JSON.stringify(expand)}).`);
    };

    if (req.query?.lang && typeof req.query.lang === 'string')
      return this.coursesGroupsService.findAllLocalized(req.query.lang, expandArray)
    return await this.coursesGroupsService.findAll(expandArray);
  }
}

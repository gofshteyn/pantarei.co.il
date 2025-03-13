import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Logger } from '@nestjs/common';
import { CoursesGroupsService } from './courses-groups.service';
import { CreateCoursesGroupDto } from './dto/create-courses-group.dto';
import { UpdateCoursesGroupDto } from './dto/update-courses-group.dto';
import { CoursesGroup } from './entities/courses-group.entity';

@Controller('api/courses-groups')
export class CoursesGroupsController {
  constructor(private readonly coursesGroupsService: CoursesGroupsService) {}

  // @Post()
  // create(@Body() createCoursesGroupDto: CreateCoursesGroupDto) {
  //   return this.coursesGroupsService.create(createCoursesGroupDto);
  // }

  // : Promise<CoursesGroup[]>
  @Get()
  public async findAll(@Query('expand') expand: string) {
    // Передача параметра ?expand=["courses", "prices"]
    let expandArray = [];
    try {
      expandArray = expand ? JSON.parse(expand) : [];
    } catch (e) {
      expandArray = [];
      Logger.warn(`Пользователь передал параметр "expand" в неверном формате (${JSON.stringify(expand)}).`);
    };
    return await this.coursesGroupsService.findAll(expandArray);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.coursesGroupsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCoursesGroupDto: UpdateCoursesGroupDto) {
  //   return this.coursesGroupsService.update(+id, updateCoursesGroupDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.coursesGroupsService.remove(+id);
  // }
}

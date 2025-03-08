import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get()
  async findAll(): Promise<CoursesGroup[]> {
    return await this.coursesGroupsService.findAll();
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

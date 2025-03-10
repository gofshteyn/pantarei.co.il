import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExcursionsService } from './excursions.service';
import { CreateExcursionDto } from './dto/create-excursion.dto';
import { UpdateExcursionDto } from './dto/update-excursion.dto';
import { Excursion } from './entities/excursion.entity';

@Controller('api/excursions')
export class ExcursionsController {
  constructor(private readonly excursionsService: ExcursionsService) {}

  // @Post()
  // create(@Body() createExcursionDto: CreateExcursionDto) {
  //   return this.excursionsService.create(createExcursionDto);
  // }

  @Get()
  public async findAll(): Promise<Excursion[]> {
    return await this.excursionsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.excursionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateExcursionDto: UpdateExcursionDto) {
  //   return this.excursionsService.update(+id, updateExcursionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.excursionsService.remove(+id);
  // }
}

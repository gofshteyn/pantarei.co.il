import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocalesService } from './locales.service';
import { CreateLocaleDto } from './dto/create-locale.dto';
import { UpdateLocaleDto } from './dto/update-locale.dto';
import Locale from './entities/locale.entity';

@Controller('api/locales')
export class LocalesController {
  constructor(private readonly localesService: LocalesService) {}

  // @Post()
  // create(@Body() createLocaleDto: CreateLocaleDto) {
  //   return this.localesService.create(createLocaleDto);
  // }

  @Get()
  async findAll(): Promise<Locale[]> {
    return await this.localesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.localesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLocaleDto: UpdateLocaleDto) {
  //   return this.localesService.update(+id, updateLocaleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.localesService.remove(+id);
  // }
}

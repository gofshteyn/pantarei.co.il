import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Controller('api/languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  // @Post()
  // create(@Body() createLanguageDto: CreateLanguageDto) {
  //   return this.languagesService.create(createLanguageDto);
  // }

  @Get()
  public async findAll(): Promise<Language[]> {
    return await this.languagesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.languagesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLanguageDto: UpdateLanguageDto) {
  //   return this.languagesService.update(+id, updateLanguageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.languagesService.remove(+id);
  // }
}

import { Controller, Get, Req } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { Request } from 'express';
import { Language } from './entities/language.entity';

@Controller('api/languages')
export class LanguagesController {
  constructor(
    private readonly languagesService: LanguagesService
  ) {}

  @Get()
  public async findAll(@Req() req: Request): Promise<Language[]> {
    if (req.query?.lang && typeof req.query.lang === 'string')
      return await this.languagesService.findAllLocalized(req.query.lang);
    return await this.languagesService.findAll();
  }
}
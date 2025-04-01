import { Controller, Get, Req } from '@nestjs/common';
import { LocalesService } from './locales.service';
import Locale from './entities/locale.entity';
import { Request } from 'express';

@Controller('api/locales')
export class LocalesController {
  constructor(private readonly localesService: LocalesService) {}

  @Get()
  async findAll(@Req() req: Request): Promise<Locale[]> {
    if (req.query?.lang && typeof req.query.lang === 'string')
      return await this.localesService.findAllLocalize(req.query.lang);
    return await this.localesService.findAll();
  }
}
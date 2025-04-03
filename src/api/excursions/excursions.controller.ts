import { Controller, Get, Req } from '@nestjs/common';
import { ExcursionsService } from './excursions.service';
import { Excursion } from './entities/excursion.entity';
import { Request } from 'express';

@Controller('api/excursions')
export class ExcursionsController {
  constructor(private readonly excursionsService: ExcursionsService) {}

  @Get()
  public async findAll(@Req() req: Request): Promise<Excursion[]> {
    if (req.query?.lang && typeof req.query.lang === 'string')
      return await this.excursionsService.findAllLocalized(req.query.lang);
    return await this.excursionsService.findAll();
  }
}
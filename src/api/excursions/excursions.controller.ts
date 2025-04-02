import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExcursionsService } from './excursions.service';
import { Excursion } from './entities/excursion.entity';

@Controller('api/excursions')
export class ExcursionsController {
  constructor(private readonly excursionsService: ExcursionsService) {}

  @Get()
  public async findAll(): Promise<Excursion[]> {
    return await this.excursionsService.findAll();
  }
}
import { Controller, Get, Req } from '@nestjs/common';
import { ProductsGroupsService } from './products-groups.service';
import { Request } from 'express';

@Controller('api/products-groups')
export class ProductsGroupsController {
  constructor(private readonly productsGroupsService: ProductsGroupsService) {}

  @Get()
  findAll(@Req() req: Request) {
    if (req.query?.lang && typeof req.query.lang === 'string')
      return this.productsGroupsService.findAllLocalized(req.query.lang);
    return this.productsGroupsService.findAll();
  }

}

import { Controller, Get, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Request } from 'express';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public async findAll(@Req() req: Request): Promise<Product[]> {
    if (req.query?.lang && typeof req.query.lang === 'string')
      return this.productsService.findAllLocalized(req.query.lang);
    return this.productsService.findAll();
  }
}

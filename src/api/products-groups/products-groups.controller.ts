import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsGroupsService } from './products-groups.service';
import { CreateProductsGroupDto } from './dto/create-products-group.dto';
import { UpdateProductsGroupDto } from './dto/update-products-group.dto';

@Controller('api/products-groups')
export class ProductsGroupsController {
  constructor(private readonly productsGroupsService: ProductsGroupsService) {}

  @Post()
  create(@Body() createProductsGroupDto: CreateProductsGroupDto) {
    return this.productsGroupsService.create(createProductsGroupDto);
  }

  @Get()
  findAll() {
    return this.productsGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsGroupDto: UpdateProductsGroupDto) {
    return this.productsGroupsService.update(+id, updateProductsGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsGroupsService.remove(+id);
  }
}

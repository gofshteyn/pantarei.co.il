import { Injectable } from '@nestjs/common';
import { CreateProductsGroupDto } from './dto/create-products-group.dto';
import { UpdateProductsGroupDto } from './dto/update-products-group.dto';

@Injectable()
export class ProductsGroupsService {
  create(createProductsGroupDto: CreateProductsGroupDto) {
    return 'This action adds a new productsGroup';
  }

  findAll() {
    return `This action returns all productsGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsGroup`;
  }

  update(id: number, updateProductsGroupDto: UpdateProductsGroupDto) {
    return `This action updates a #${id} productsGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsGroup`;
  }
}

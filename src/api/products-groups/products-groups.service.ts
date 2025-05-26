import { Injectable } from '@nestjs/common';
import { CreateProductsGroupDto } from './dto/create-products-group.dto';
import { UpdateProductsGroupDto } from './dto/update-products-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsGroupsService {

  public async findAllLocalized(lang: string) {
    const result = await this.findAll();
    return result;
  }

  findAll() {
    return `This action returns all productsGroups`;
  }

}

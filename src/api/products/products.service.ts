import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ProductsGroup } from '../products-groups/entities/products-group.entity';

@Injectable()
export class ProductsService {

  constructor(private readonly prismaService: PrismaService) {}
  
  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  public async findAll(): Promise<Product[]> {
    const result = await this.prismaService.product.findMany({
      include: {
        group: true
      },
      orderBy: {
        position: 'asc'
      }
    });
        
    return result.map(product =>
      plainToInstance(Product, {
        ...product,
        group: product.group ? plainToInstance(ProductsGroup, product.group) : null
      })
    );
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}

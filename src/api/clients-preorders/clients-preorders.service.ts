import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateClientsPreorderDto } from './dto/create-clients-preorder.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { ClientsPreorder } from './entities/clients-preorder.entity';
import { ProductPreview } from '../products/entities/product-preview.entity';

@Injectable()
export class ClientsPreordersService {

  constructor(private readonly prisma: PrismaService) {}

  public async create(createClientsPreorderDto: CreateClientsPreorderDto) {
    
    let result;

    try {
      result = await this.prisma.clientsPreorder.create({
        data: {
          firstName: createClientsPreorderDto.firstName,
          lastName: createClientsPreorderDto.lastName,
          phone: createClientsPreorderDto.phone,
          email: createClientsPreorderDto.email,
          productId: createClientsPreorderDto.productId,
          isMediaRequired: createClientsPreorderDto.isMediaRequired,
          comment: createClientsPreorderDto.comment,
          localeId: createClientsPreorderDto.localeId
        },
        include: {
          product: true
        }
      });
      
    } catch (e) {
      Logger.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new BadRequestException(`Нарушение внешнего ключа.`);
        };
      };
      throw new InternalServerErrorException();
    };

    result.product = plainToInstance(ProductPreview, result.product);
    return plainToInstance(ClientsPreorder, result);
  }

  public findAll() {
    return `This action returns all clientsPreorders`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} clientsPreorder`;
  // }

  // update(id: number, updateClientsPreorderDto: UpdateClientsPreorderDto) {
  //   return `This action updates a #${id} clientsPreorder`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} clientsPreorder`;
  // }
}

import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateClientsPreorderDto } from './dto/create-clients-preorder.dto';
import { UpdateClientsPreorderDto } from './dto/update-clients-preorder.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ClientsPreordersService {

  constructor(private readonly prisma: PrismaService) {}

  public async create(createClientsPreorderDto: CreateClientsPreorderDto) {
    
    let result;
    try {
      result = await this.prisma.clientsPreorder.create({
        data: {
          displayName: createClientsPreorderDto.displayName,
          phone: createClientsPreorderDto.phone,
          email: createClientsPreorderDto.email,
          productId: createClientsPreorderDto.productId,
          isMediaRequired: createClientsPreorderDto.isMediaRequired
        },
        select: {
          id: true,
          registrationDate: true,
          displayName: true,
          phone: true,
          email: true,
          productId: true,
          isMediaRequired: true
        }
      });
    } catch (e) {
      Logger.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003')
          throw new BadRequestException('Product not found');
      };
      throw new InternalServerErrorException();
    };

    return result;
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

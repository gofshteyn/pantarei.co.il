import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Currency } from './entities/currency.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CurrenciesService {

  constructor (private readonly prismaService: PrismaService) {}
  
  // create(createCurrencyDto: CreateCurrencyDto) {
  //   return 'This action adds a new currency';
  // }

  public async findAll(): Promise<Currency[]> {
    const result = await this.prismaService.currency.findMany({
      orderBy: {
        id: 'asc'
      }
    });
    return plainToInstance(Currency, result);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} currency`;
  // }

  // update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
  //   return `This action updates a #${id} currency`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} currency`;
  // }
}

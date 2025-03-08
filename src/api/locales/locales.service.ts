import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToClass, plainToInstance } from 'class-transformer';
import Locale from './entities/locale.entity';

@Injectable()
export class LocalesService {

  constructor (private readonly prismaService: PrismaService) {}

  // create(createLocaleDto: CreateLocaleDto) {
  //   return 'This action adds a new locale';
  // }

  async findAll(): Promise<Locale[]> {
    const result = await this.prismaService.locale.findMany({
      select: {
        language: true,
        isDefault: true
      },
      orderBy: {
        languageId: 'asc'
      }
    });
    return plainToInstance(Locale, result);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} locale`;
  // }

  // update(id: number, updateLocaleDto: UpdateLocaleDto) {
  //   return `This action updates a #${id} locale`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} locale`;
  // }
}

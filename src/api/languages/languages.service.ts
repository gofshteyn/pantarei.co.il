import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {

  constructor (private readonly prismaService: PrismaService) {}
  
  // create(createLanguageDto: CreateLanguageDto) {
  //   return 'This action adds a new language';
  // }

  public async findAll(): Promise<Language[]> {
    const result = await this.prismaService.language.findMany({
      select: {
        id: true,
        code: true,
        displayName: true,
        displayNameLocales: true,
        imageUrl: true
      },
      orderBy: {
        id: 'asc'
      }
    });
    return plainToInstance(Language, result);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} language`;
  // }

  // update(id: number, updateLanguageDto: UpdateLanguageDto) {
  //   return `This action updates a #${id} language`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} language`;
  // }
}

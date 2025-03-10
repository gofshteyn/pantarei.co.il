import { Injectable } from '@nestjs/common';
import { CreateExcursionDto } from './dto/create-excursion.dto';
import { UpdateExcursionDto } from './dto/update-excursion.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Excursion } from './entities/excursion.entity';

@Injectable()
export class ExcursionsService {

  constructor (private readonly prismaService: PrismaService) {}

  // create(createExcursionDto: CreateExcursionDto) {
  //   return 'This action adds a new excursion';
  // }

  public async findAll(): Promise<Excursion[]> {
    const result = await this.prismaService.excursion.findMany({
          select: {
            id: true,
            code: true,
            displayName: true,
            displayNameLocales: true,
            subtitle: true,
            subtitleLocales: true,
            description: true,
            descriptionLocales: true,
            position: true,
            logoUrl: true,
            imageUrl: true
          },
          orderBy: {
            position: 'asc'
          }
        });
        return plainToInstance(Excursion, result);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} excursion`;
  // }

  // update(id: number, updateExcursionDto: UpdateExcursionDto) {
  //   return `This action updates a #${id} excursion`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} excursion`;
  // }
}

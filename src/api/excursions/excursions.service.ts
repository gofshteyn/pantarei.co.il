import { Injectable } from '@nestjs/common';
import { CreateExcursionDto } from './dto/create-excursion.dto';
import { UpdateExcursionDto } from './dto/update-excursion.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Excursion } from './entities/excursion.entity';
import { ExcursionFeature } from './entities/excursion-feature.entity';
import { ExcursionInclusion } from './entities/excursion-inclusion.entity';
import { ExcursionSuggestion } from './entities/excursion-suggestion.entity';

@Injectable()
export class ExcursionsService {

  constructor (private readonly prismaService: PrismaService) {}

  // create(createExcursionDto: CreateExcursionDto) {
  //   return 'This action adds a new excursion';
  // }

  public async findAll(): Promise<Excursion[]> {
    const result = await this.prismaService.excursion.findMany({
      include: {
        features: {
          orderBy: {
            position: 'asc'
          }
        },
        inclusions: {
          orderBy: {
            position: 'asc'
          }
        },
        suggestions: {
          orderBy: {
            position: 'asc'
          }
        }
      },
      orderBy: {
        position: 'asc'
      }
    });
    
    return result.map(excursion =>
      plainToInstance(Excursion, {
        ...excursion,
        features: excursion.features ? plainToInstance(ExcursionFeature, excursion.features) : null,
        inclusions: excursion.inclusions ? plainToInstance(ExcursionInclusion, excursion.inclusions) : null,
        suggestions: excursion.suggestions ? plainToInstance(ExcursionSuggestion, excursion.suggestions) : null
      })
    );
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

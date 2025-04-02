import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import Locale from './entities/locale.entity';

@Injectable()
export class LocalesService {

  constructor (private readonly prismaService: PrismaService) {}

  public async findAllLocalize(lang: string): Promise<Locale[]> {
    const result = await this.findAll();

    return result.map(item => {
      let locales: Record<string, string> = {};
      try {
        if (typeof item.language.displayNameLocales === 'string') {
          locales = JSON.parse(item.language.displayNameLocales);
        } else if (item.language.displayNameLocales && typeof item.language.displayNameLocales === 'object') {
          locales = item.language.displayNameLocales as Record<string, string>;
        }
      } catch (error) {
        Logger.error(error``);
      };
      return plainToInstance(Locale, {
        ...item,
        language: {
          ...item.language,
          displayName: locales[lang] || item.language.displayName,
          displayNameLocales: undefined
        }
      });
    });
  }

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
}
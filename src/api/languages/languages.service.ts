import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {

  constructor (private readonly prismaService: PrismaService) {}

  public async findAllLocalized(lang: string): Promise<Language[]> {
    const result = await this.findAll();
    
    return result.map(item => {
      let locales: Record<string, string> = {};

      try {
        if (typeof item.displayNameLocales === 'string') {
          locales = JSON.parse(item.displayNameLocales);
        } else if (item.displayNameLocales && typeof item.displayNameLocales === 'object') {
          locales = item.displayNameLocales as Record<string, string>;
        }
      } catch (error) {
        Logger.error(`Failed to parse locales for locale ${item.id}:`, error);
      };

      return plainToInstance(Language, {
        ...item,
        displayName: locales[lang] || item.displayName,
        displayNameLocales: undefined
      });
    });
  }

  public async findAll(lang?: string): Promise<Language[]> {
    if (lang)
      return this.findAllLocalized(lang);

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
}
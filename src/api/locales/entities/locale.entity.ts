import { Expose, Type } from 'class-transformer';
import { Language } from 'src/api/languages/entities/language.entity';

export default class Locale {
  @Expose()
  @Type(() => Language)
  language: {
    id: string;
    code: string;
    displayName: string;
    displayNameLocales: object;
    imageUrl: string;
  };

  @Expose()
  isDefault: boolean;
}

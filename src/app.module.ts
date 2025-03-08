import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NotFoundFilter } from './common/filters/not-found.filter';
import { LocalesModule } from './api/locales/locales.module';
import { LanguagesModule } from './api/languages/languages.module';
import { CurrenciesModule } from './api/currencies/currencies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    LocalesModule,
    LanguagesModule,
    CurrenciesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter,
    }
  ]
})
export class AppModule {}

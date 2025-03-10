import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NotFoundFilter } from './common/filters/not-found.filter';
import { LocalesModule } from './api/locales/locales.module';
import { LanguagesModule } from './api/languages/languages.module';
import { CurrenciesModule } from './api/currencies/currencies.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesGroupsModule } from './api/courses-groups/courses-groups.module';
import { CoursesModule } from './api/courses/courses.module';
import { ClientsPreordersModule } from './api/clients-preorders/clients-preorders.module';
import { ProductsModule } from './api/products/products.module';
import { ExcursionsModule } from './api/excursions/excursions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    LocalesModule,
    LanguagesModule,
    CurrenciesModule,
    PrismaModule,
    CoursesGroupsModule,
    CoursesModule,
    ClientsPreordersModule,
    ProductsModule,
    ExcursionsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter,
    },
    PrismaService
  ]
})
export class AppModule {}

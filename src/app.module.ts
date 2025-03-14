import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { ProductsGroupsModule } from './api/products-groups/products-groups.module';
import { GalleryModule } from './api/gallery/gallery.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          secure: configService.get<boolean>('SMTP_secure'),
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASSWORD')
          }
        },
        defaults: {
          from: `"${configService.get<string>('EMAIL_DEFAULT_FROM')}" <${configService.get<string>('EMAIL_NOREPLY_ADDRESS')}>`
        },
        template: {
          dir: join(__dirname, '..', 'views'),
          adapter: new (require('@nestjs-modules/mailer/dist/adapters/ejs.adapter')).EjsAdapter(),
          options: {
            strict: true
          }
        }
      })
    }),
    LocalesModule,
    LanguagesModule,
    CurrenciesModule,
    PrismaModule,
    CoursesGroupsModule,
    CoursesModule,
    ClientsPreordersModule,
    ProductsModule,
    ExcursionsModule,
    ProductsGroupsModule,
    GalleryModule
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

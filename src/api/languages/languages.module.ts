import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WebServiceClientAdapter } from 'src/geo-location/web-service-client.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}

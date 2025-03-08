import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
})
export class CurrenciesModule {}

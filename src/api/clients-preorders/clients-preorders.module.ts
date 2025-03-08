import { Module } from '@nestjs/common';
import { ClientsPreordersService } from './clients-preorders.service';
import { ClientsPreordersController } from './clients-preorders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClientsPreordersController],
  providers: [ClientsPreordersService],
})
export class ClientsPreordersModule {}

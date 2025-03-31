import { Module } from '@nestjs/common';
import { ClientsPreordersService } from './clients-preorders.service';
import { ClientsPreordersController } from './clients-preorders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WebServiceClientAdapter } from 'src/geo-location/web-service-client.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [ClientsPreordersController],
  providers: [ClientsPreordersService, WebServiceClientAdapter],
})
export class ClientsPreordersModule {}

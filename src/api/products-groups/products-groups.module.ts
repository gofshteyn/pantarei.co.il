import { Module } from '@nestjs/common';
import { ProductsGroupsService } from './products-groups.service';
import { ProductsGroupsController } from './products-groups.controller';

@Module({
  controllers: [ProductsGroupsController],
  providers: [ProductsGroupsService],
})
export class ProductsGroupsModule {}

import { Module } from '@nestjs/common';
import { CoursesGroupsService } from './courses-groups.service';
import { CoursesGroupsController } from './courses-groups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CoursesGroupsController],
  providers: [CoursesGroupsService],
})
export class CoursesGroupsModule {}

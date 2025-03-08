import { PartialType } from '@nestjs/mapped-types';
import { CreateCoursesGroupDto } from './create-courses-group.dto';

export class UpdateCoursesGroupDto extends PartialType(CreateCoursesGroupDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsGroupDto } from './create-products-group.dto';

export class UpdateProductsGroupDto extends PartialType(CreateProductsGroupDto) {}

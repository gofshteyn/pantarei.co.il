import { PartialType } from '@nestjs/mapped-types';
import { CreateClientsPreorderDto } from './create-clients-preorder.dto';

export class UpdateClientsPreorderDto extends PartialType(CreateClientsPreorderDto) {}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientsPreordersService } from './clients-preorders.service';
import { CreateClientsPreorderDto } from './dto/create-clients-preorder.dto';
import { UpdateClientsPreorderDto } from './dto/update-clients-preorder.dto';

@Controller('api/clients-preorders')
export class ClientsPreordersController {
  constructor(private readonly clientsPreordersService: ClientsPreordersService) {}

  @Post()
  public async create(@Body() createClientsPreorderDto: CreateClientsPreorderDto) {
    return await this.clientsPreordersService.create(createClientsPreorderDto);
  }

  @Get()
  findAll() {
    return this.clientsPreordersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.clientsPreordersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClientsPreorderDto: UpdateClientsPreorderDto) {
  //   return this.clientsPreordersService.update(+id, updateClientsPreorderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.clientsPreordersService.remove(+id);
  // }
}

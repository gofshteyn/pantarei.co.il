import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './entities/currency.entity';

@Controller('api/currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  // @Post()
  // create(@Body() createCurrencyDto: CreateCurrencyDto) {
  //   return this.currenciesService.create(createCurrencyDto);
  // }

  @Get()
  public async findAll(): Promise<Currency[]> {
    return await this.currenciesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.currenciesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCurrencyDto: UpdateCurrencyDto) {
  //   return this.currenciesService.update(+id, updateCurrencyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.currenciesService.remove(+id);
  // }
}

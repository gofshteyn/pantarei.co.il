import { Controller, Get, Logger, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async home(@Req() req: Request, @Res() res: Response): Promise<void> {
    const lang = await this.appService.detectLocalization(req);
    return res.redirect(`/${lang}/`);
  }

  @Get('ru')
  async ruHome(@Res() res: Response): Promise<void> {
    return res.render(`home/index.ru.ejs`);
  }

  @Get('en')
  async enHome(@Res() res: Response): Promise<void> {
    return res.render(`home/index.en.ejs`);
  }

  @Get('he')
  async heHome(@Res() res: Response): Promise<void> {
    return res.render(`home/index.he.ejs`);
  }
  
}

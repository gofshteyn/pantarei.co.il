import { Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from 'src/app.service';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {

  constructor(private readonly appService: AppService) {}

  async catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const lang = await this.appService.detectLocalization(request);
    response.status(404).render(`404/index.${lang}.ejs`);
  }
}

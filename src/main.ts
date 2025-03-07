import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APPLICATION_PORT') || 3000;

  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.listen(port).then(() => {
    Logger.log(`Сервер запущен на порту ${port}`);
  }).catch(e => {
    Logger.error(`Ошибка запуска сервера на порту ${port}`);
    process.exit(1);
  });
}
bootstrap();

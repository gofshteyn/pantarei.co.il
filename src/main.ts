import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NotFoundFilter } from './common/filters/not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APPLICATION_PORT') || 3000;

  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.useGlobalPipes(new ValidationPipe());

  const allowedOrigins = configService.get<string>('ALLOWED_ORIGINS');
  const originsArray = JSON.parse(allowedOrigins);
  
  if (originsArray.includes('*') && originsArray.length > 1) {
    Logger.error(`При конфигурировании CORS в .env вы не можете одновременно использовать "*" и еще какие-то домены. Или оставьте только "*", убрав домены или оставьте домены и уберите "*".`);
    Logger.error(originsArray);
  };

  app.enableCors({
    origin: originsArray
  });

  app.listen(port).then(() => {
    Logger.log(`Сервер запущен на порту ${port}`);
  }).catch(e => {
    Logger.error(`Ошибка запуска сервера на порту ${port}`);
    process.exit(1);
  });
}
bootstrap();

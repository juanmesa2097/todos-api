import { AllExceptionsFilter } from '@lib/filters';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app
    .useGlobalPipes(new ValidationPipe({ whitelist: true }))
    .useGlobalFilters(new AllExceptionsFilter())
    .setGlobalPrefix('api/v1')
    .enableCors({ origin: '*' } as CorsOptions);

  // Get config service instance
  const appConfig: AppConfigService = app.get('AppConfigService');

  await app.listen(appConfig.port);
}

bootstrap();

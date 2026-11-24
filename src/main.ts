import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WrapInterceptorInterceptor } from './common/interceptors/wrap-interceptor/wrap-interceptor.interceptor';
import { CustomHttpExceptionFilter } from './common/custom-exceptions/custom-http-exception/custom-http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalInterceptors(new WrapInterceptorInterceptor());
  app.useGlobalFilters(new CustomHttpExceptionFilter());
  await app.listen(3000);
}
void bootstrap();

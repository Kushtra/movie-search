import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

async function startServer() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  await app.listen(3000);
}

startServer();

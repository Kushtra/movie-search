import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import initializeMiddleware from '@/common/middleware';

async function startServer() {
  const app = await NestFactory.create(AppModule);
  initializeMiddleware(app);
  await app.listen(3000);
}

startServer();

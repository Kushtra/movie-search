import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function startServer() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

startServer();

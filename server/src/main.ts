import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import initializeDatabase from './libs/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

initializeDatabase()
  .then(() => bootstrap())
  .catch((e) => console.error(e));

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

try {
  bootstrap();
} catch (e: unknown) {
  console.error(e);
  console.error('Unexpected error occured, exiting...');
  process.exit(1);
}

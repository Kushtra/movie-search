import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';

const initializeMiddleware = (app: INestApplication) => {
  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true
    })
  );
};

export default initializeMiddleware;

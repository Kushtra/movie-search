import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [MikroOrmModule.forRoot(), UserModule, AuthModule, MovieModule]
})
export class AppModule {}

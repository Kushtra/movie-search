import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MikroOrmModule.forRoot(), UserModule, AuthModule]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserService } from '@/user/user.service';
import { UserController } from '@/user/user.controller';
import { User } from '@/user/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}

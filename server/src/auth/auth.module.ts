import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RefreshTokenService } from './refreshToken.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RefreshToken } from './refreshToken.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MikroOrmModule.forFeature([RefreshToken]), UserModule],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenService, JwtStrategy]
})
export class AuthModule {}

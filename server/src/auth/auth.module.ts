import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RefreshTokenService } from './refreshToken.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RefreshToken } from './refreshToken.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { OptionalStrategy } from './strategies/optional.strategy';

@Module({
  imports: [MikroOrmModule.forFeature([RefreshToken]), UserModule],
  controllers: [AuthController],
  providers: [RefreshTokenService, JwtStrategy, OptionalStrategy]
})
export class AuthModule {}

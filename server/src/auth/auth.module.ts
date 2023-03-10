import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthController } from '@/auth/auth.controller';
import { RefreshTokenService } from '@/auth/refreshToken.service';
import { RefreshToken } from '@/auth/refreshToken.entity';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';
import { OptionalStrategy } from '@/auth/strategies/optional.strategy';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [MikroOrmModule.forFeature([RefreshToken]), UserModule],
  controllers: [AuthController],
  providers: [RefreshTokenService, JwtStrategy, OptionalStrategy]
})
export class AuthModule {}

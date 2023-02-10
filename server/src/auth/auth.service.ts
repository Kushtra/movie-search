import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from 'src/common/config';
import { TOKEN_EXP_TIME } from 'src/common/constants';
import { BadRequest, InternalServer } from 'src/common/exceptions';
import { comparePasswords } from 'src/lib/cryptography';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { RefreshToken } from './refreshToken.entity';
import { RefreshTokenService } from './refreshToken.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly refreshTokenService: RefreshTokenService) {}

  async refresh(refreshStr: string): Promise<string> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);

    if (refreshToken === null) throw new BadRequest();

    const user = await this.userService.fetchById(refreshToken.user.id);

    return sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: TOKEN_EXP_TIME });
  }

  async login(email: string, password: string, values: TokenMetadata): Promise<Tokens> {
    const user = await this.userService.fetchByEmail(email);

    const correctPassword = await comparePasswords(password, user.password).catch(err => {
      console.error(err); // TODO: add in cryptography error handling and here only catch unexpected errors
      throw new BadRequest();
    });

    if (!correctPassword) throw new BadRequest();

    return this.newRefreshAndAccessToken(user, values);
  }

  async logout(refreshStr: string): Promise<void> {
    try {
      const refreshToken = await this.retrieveRefreshToken(refreshStr);

      await this.refreshTokenService.delete(refreshToken.id);
    } catch (err) {
      if (err instanceof InternalServer) throw err;
    }
  }

  private async newRefreshAndAccessToken(user: User, values: TokenMetadata): Promise<Tokens> {
    const refreshToken = new RefreshToken({
      ...values,
      user
    });

    const id = await this.refreshTokenService.create(refreshToken);

    refreshToken.id = id;

    return {
      refreshToken: refreshToken.sign(),
      accessToken: sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: TOKEN_EXP_TIME })
    };
  }

  private async retrieveRefreshToken(refreshStr: string): Promise<RefreshToken> {
    try {
      const decoded = verify(refreshStr, REFRESH_TOKEN_SECRET);

      if (typeof decoded === 'string') throw new BadRequest();

      const refreshToken = await this.refreshTokenService.fetchById(decoded.id);

      return refreshToken;
    } catch (err) {
      throw new BadRequest();
    }
  }
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface TokenMetadata {
  ipAddress: string;
  userAgent?: string;
}

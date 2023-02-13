import { Controller, Post, Body, Ip, Delete, Headers } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from 'src/common/config';
import { TOKEN_EXP_TIME } from 'src/common/constants';
import { BadRequest, NotFound } from 'src/common/exceptions';
import { comparePasswords } from 'src/lib/cryptography';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto, LoginValidator, TokenRefreshDto, TokenRefreshValidator } from './auth.validator';
import { RefreshToken } from './refreshToken.entity';
import { RefreshTokenService } from './refreshToken.service';
import { AccessAndRefreshToken, AccessToken } from './tokens.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService, private readonly refreshTokenService: RefreshTokenService) {}

  @Post('login')
  async login(
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
    @Body() loginBody: LoginDto
  ): Promise<AccessAndRefreshToken> {
    const { email, password } = await LoginValidator.parseAsync(loginBody).catch(() => {
      throw new BadRequest();
    });

    const user = await this.userService.fetchByEmail(email).catch(err => {
      if (err instanceof NotFound) throw new NotFound('user not found');
      throw err;
    });

    const correctPassword = await comparePasswords(password, user.password);

    if (!correctPassword) throw new NotFound('user not found');

    const refreshToken = new RefreshToken({ ipAddress, userAgent, user });

    const refreshTokenId = await this.refreshTokenService.create(refreshToken);

    refreshToken.id = refreshTokenId;

    const accessToken = this.generateAccessToken(user);

    return {
      refreshToken: refreshToken.sign(),
      accessToken
    };
  }

  @Post('refresh')
  async refreshToken(@Body() tokenRefreshBody: TokenRefreshDto): Promise<AccessToken> {
    const { refreshTokenStr } = await TokenRefreshValidator.parseAsync(tokenRefreshBody).catch(() => {
      throw new BadRequest();
    });
    const refreshToken = await this.verifyAndFetchRefreshToken(refreshTokenStr);

    const user = await this.userService.fetchById(refreshToken.user.id);

    const accessToken = this.generateAccessToken(user);

    return { accessToken };
  }

  @Delete('logout')
  async logout(@Body() logoutBody: TokenRefreshDto): Promise<void> {
    const { refreshTokenStr } = await TokenRefreshValidator.parseAsync(logoutBody).catch(() => {
      throw new BadRequest();
    });

    const refreshToken = await this.verifyAndFetchRefreshToken(refreshTokenStr);

    await this.refreshTokenService.delete(refreshToken.id);
  }

  private async verifyAndFetchRefreshToken(refreshStr: string): Promise<RefreshToken> {
    const decoded = verify(refreshStr, REFRESH_TOKEN_SECRET);

    if (typeof decoded === 'string') throw new BadRequest();

    const refreshToken = await this.refreshTokenService.fetchById(decoded.id).catch(err => {
      if (err instanceof NotFound) throw new BadRequest();
      throw err;
    });

    return refreshToken;
  }

  private generateAccessToken(user: User): string {
    return sign(
      {
        id: user.id,
        username: user.username
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: TOKEN_EXP_TIME }
    );
  }
}

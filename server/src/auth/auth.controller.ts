import {
  Controller,
  Post,
  Body,
  Ip,
  Delete,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  Res,
  Req
} from '@nestjs/common';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from 'src/common/config';
import { TOKEN_EXP_TIME } from 'src/common/constants';
import { buildCookie } from 'src/common/cookieBuilder';
import { comparePasswords, hashPassword } from 'src/lib/cryptography';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateUserDto, CreateUserValidator } from 'src/user/user.validator';
import { LoginDto, LoginValidator, TokenRefreshValidator } from './auth.validator';
import { RefreshToken } from './refreshToken.entity';
import { RefreshTokenService } from './refreshToken.service';
import { AccessToken } from './tokens.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService, private readonly refreshTokenService: RefreshTokenService) {}

  @Post('register') // TODO: polish this endpoint
  async register(
    @Ip() ipAddress: string,
    @Body() createUserBody: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AccessToken> {
    const { password, email } = await CreateUserValidator.parseAsync(createUserBody).catch(() => {
      throw new BadRequestException();
    });
    const hashedPassword = await hashPassword(password);
    const user = new User({ email: email.toLowerCase(), password: hashedPassword });
    user.id = await this.userService.create(user);
    const refreshToken = new RefreshToken({ ipAddress, user });
    refreshToken.id = await this.refreshTokenService.create(refreshToken);
    const accessToken = this.generateAccessToken(user);
    response.setHeader(
      'Set-Cookie',
      buildCookie('refreshToken', refreshToken.sign(), {
        sameSite: 'strict',
        path: '/api/auth/refresh',
        httpOnly: true,
        secure: true
      })
    );
    return { accessToken };
  }

  @Post('login')
  async login(
    @Ip() ipAddress: string,
    @Body() loginBody: LoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AccessToken> {
    const { email, password } = await LoginValidator.parseAsync(loginBody).catch(() => {
      throw new BadRequestException();
    });
    const user = await this.userService.fetchByEmail(email.toLowerCase()).catch(err => {
      if (err instanceof NotFoundException) throw new UnauthorizedException();
      throw err;
    });
    const isPasswordCorrect = await comparePasswords(password, user.password);
    if (!isPasswordCorrect) throw new UnauthorizedException();
    const refreshToken = new RefreshToken({ ipAddress, user });
    refreshToken.id = await this.refreshTokenService.create(refreshToken);
    const accessToken = this.generateAccessToken(user);
    response.setHeader(
      'Set-Cookie',
      buildCookie('refreshToken', refreshToken.sign(), {
        sameSite: 'strict',
        path: '/api/auth/refresh',
        httpOnly: true,
        secure: true
      })
    );
    return { accessToken };
  }

  @Post('refresh')
  async refreshToken(@Req() request: Request): Promise<AccessToken> {
    const refreshTokenStr = await TokenRefreshValidator.parseAsync(request.cookies.refreshToken).catch(() => {
      throw new BadRequestException();
    });
    const refreshToken = await this.verifyAndFetchRefreshToken(refreshTokenStr);
    const user = await this.userService.fetchById(refreshToken.user.id);
    const accessToken = this.generateAccessToken(user);
    return { accessToken };
  }

  @Delete('logout')
  async logout(@Req() request: Request): Promise<void> {
    const refreshTokenStr = await TokenRefreshValidator.parseAsync(request.cookies.refreshToken).catch(() => {
      throw new BadRequestException();
    });
    const refreshToken = await this.verifyAndFetchRefreshToken(refreshTokenStr);
    await this.refreshTokenService.delete(refreshToken.id);
  }

  private async verifyAndFetchRefreshToken(refreshStr: string): Promise<RefreshToken> {
    const decoded = verify(refreshStr, REFRESH_TOKEN_SECRET);
    if (typeof decoded === 'string') throw new UnauthorizedException();
    const refreshToken = await this.refreshTokenService.fetchById(decoded.id).catch(err => {
      if (err instanceof NotFoundException) throw new UnauthorizedException();
      throw err;
    });
    return refreshToken;
  }

  private generateAccessToken(user: User): string {
    return sign({ id: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: TOKEN_EXP_TIME });
  }
}

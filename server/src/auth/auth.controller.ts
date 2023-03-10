import { Controller, Post, Body, Ip, Delete, UnauthorizedException, NotFoundException, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@/common/config';
import { COOKIE_OPTIONS, TOKEN_EXP_TIME } from '@/common/constants';
import { comparePasswords, hashPassword } from '@/lib/cryptography';
import { User } from '@/user/user.entity';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/user.validator';
import { LoginDto } from '@/auth/auth.validator';
import { RefreshToken } from '@/auth/refreshToken.entity';
import { RefreshTokenService } from '@/auth/refreshToken.service';
import { AccessToken } from '@/auth/tokens.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService, private readonly refreshTokenService: RefreshTokenService) {}

  @Post('register')
  async register(
    @Ip() ipAddress: string,
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AccessToken> {
    const hashedPassword = await hashPassword(createUserDto.password);
    const user = new User({ email: createUserDto.email.toLowerCase(), password: hashedPassword });
    user.id = await this.userService.create(user);
    const refreshToken = new RefreshToken({ ipAddress, user });
    refreshToken.id = await this.refreshTokenService.create(refreshToken);
    const accessToken = this.generateAccessToken(user);
    response.cookie('refreshToken', refreshToken.sign(), COOKIE_OPTIONS);
    return { accessToken };
  }

  @Post('login')
  async login(
    @Ip() ipAddress: string,
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AccessToken> {
    const user = await this.userService.fetchByEmail(loginDto.email.toLowerCase()).catch(err => {
      if (err instanceof NotFoundException) throw new UnauthorizedException();
      throw err;
    });
    const isPasswordCorrect = await comparePasswords(loginDto.password, user.password);
    if (!isPasswordCorrect) throw new UnauthorizedException();
    const refreshToken = new RefreshToken({ ipAddress, user });
    refreshToken.id = await this.refreshTokenService.create(refreshToken);
    const accessToken = this.generateAccessToken(user);
    response.cookie('refreshToken', refreshToken.sign(), COOKIE_OPTIONS);
    return { accessToken };
  }

  @Post('refresh')
  async refreshToken(@Req() request: Request): Promise<AccessToken> {
    const refreshToken = await this.verifyAndFetchRefreshToken(request.cookies.refreshToken);
    const user = await this.userService.fetchById(refreshToken.user.id);
    const accessToken = this.generateAccessToken(user);
    return { accessToken };
  }

  @Delete('logout')
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<void> {
    const refreshToken = await this.verifyAndFetchRefreshToken(request.cookies.refreshToken);
    await this.refreshTokenService.delete(refreshToken.id);
    response.cookie('refreshToken', '', COOKIE_OPTIONS);
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

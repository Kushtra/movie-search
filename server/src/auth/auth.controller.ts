import { Controller, Post, Body, Req, Ip, Delete } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, LoginValidator, RefreshTokenDto } from './auth.validator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request, @Ip() ip: string, @Body() loginBody: LoginDto): Promise<any> {
    const { email, password } = await LoginValidator.parseAsync(loginBody);
    return this.authService.login(email, password, {
      ipAddress: ip,
      userAgent: req.headers['user-agent']
    });
  }

  @Post('refresh')
  async refreshToken(@Body() refreshBody: RefreshTokenDto) {
    return this.authService.refresh(refreshBody.refreshToken);
  }

  @Delete('logout')
  async logout(@Body() logoutBody: RefreshTokenDto) {
    return this.authService.logout(logoutBody.refreshToken);
  }
}

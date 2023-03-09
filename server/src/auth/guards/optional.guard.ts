import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class OptionalGuard extends AuthGuard('optional') {
  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
    if (info instanceof TokenExpiredError) throw new UnauthorizedException('JWT token expired');
    return user ? user : null;
  }
}

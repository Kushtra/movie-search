import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ACCESS_TOKEN_SECRET } from 'src/common/config';
import { UserReq } from 'src/common/interfaces';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET
    });
  }

  validate(payload: JWTPayload): UserReq {
    return { id: payload.id };
  }
}

interface JWTPayload {
  id: number;
  iat: number;
  exp: number;
}

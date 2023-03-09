import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ACCESS_TOKEN_SECRET } from 'src/common/config';
import { UserReq } from 'src/common/interfaces';

export class OptionalStrategy extends PassportStrategy(Strategy, 'optional') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET
    });
  }

  validate(payload: OptionalPayload): UserReq {
    return { id: payload.id };
  }
}

interface OptionalPayload {
  id: number;
  iat: number;
  exp: number;
}

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ACCESS_TOKEN_SECRET } from 'src/common/config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET
    });
  }

  validate(payload: any) {
    console.log('wtf is payload', payload);

    return {
      userId: payload.userId
    };
  }
}

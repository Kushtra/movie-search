import { User } from 'src/user/user.entity';
import { Request } from 'express';

export interface GuardedRequest extends Request {
  user: {
    id: number;
  };
}

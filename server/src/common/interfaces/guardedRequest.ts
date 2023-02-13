import { Request } from 'express';
import { UserReq } from './userRequest';

export interface GuardedRequest extends Request {
  user: UserReq;
}

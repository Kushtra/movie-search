import { Request } from 'express';

export interface UserReq {
  id: number;
}

export interface GuardedRequest extends Request {
  user: UserReq;
}

export interface PublicRequest extends Request {
  user?: UserReq;
}

import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { sign } from 'jsonwebtoken';
import { BaseEntity } from '@/common/base.entity';
import { REFRESH_TOKEN_SECRET } from '@/common/config';
import { User } from '@/user/user.entity';

@Entity()
export class RefreshToken extends BaseEntity {
  constructor(init?: Partial<RefreshToken>) {
    super();
    Object.assign(this, init);
  }

  @ManyToOne()
  user!: User;

  @Property()
  ipAddress!: string;

  sign(): string {
    return sign({ ...this }, REFRESH_TOKEN_SECRET);
  }
}

import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { sign } from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET } from 'src/common/config';
import { User } from 'src/user/user.entity';

@Entity()
export class RefreshToken {
  constructor(init?: Partial<RefreshToken>) {
    Object.assign(this, init);
  }

  @PrimaryKey()
  id!: number;

  @ManyToOne()
  user!: User;

  @Property()
  userAgent!: string;

  @Property()
  ipAddress!: string;

  sign(): string {
    return sign({ ...this }, REFRESH_TOKEN_SECRET);
  }
}

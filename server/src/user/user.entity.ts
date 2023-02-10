import { Entity, Property } from '@mikro-orm/core';
import BaseEntity from 'src/common/base.entity';

@Entity()
export class User extends BaseEntity {
  constructor(username: string, email: string, password: string) {
    super();
    this.username = username;
    this.email = email;
    this.password = password;
  }

  @Property()
  username: string;

  @Property({ unique: true })
  email: string;

  @Property()
  password: string;
}
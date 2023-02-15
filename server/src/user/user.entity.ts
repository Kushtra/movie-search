import { Entity, Property } from '@mikro-orm/core';
import BaseEntity from 'src/common/base.entity';

@Entity()
export class User extends BaseEntity {
  constructor(init?: Partial<User>) {
    super();
    Object.assign(this, init);
  }

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;
}

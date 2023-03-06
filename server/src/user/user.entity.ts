import { Entity, Property } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { BaseEntity } from 'src/common/base.entity';

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

  @Property()
  emailVerified: boolean = false;

  static async create(em: EntityRepository<User>, init?: Partial<User>): Promise<User> {
    const user = new User(init);
    user.id = await em.nativeInsert(user);
    return user;
  }
}

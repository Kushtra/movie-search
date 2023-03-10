import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '@/common/base.entity';

@Entity()
export class Genre extends BaseEntity {
  constructor(init?: Partial<Genre>) {
    super();
    Object.assign(this, init);
  }

  @Property()
  name!: string;
}

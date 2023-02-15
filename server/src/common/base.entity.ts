import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
abstract class BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}

export default BaseEntity;

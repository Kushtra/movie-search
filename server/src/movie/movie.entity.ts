import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/base.entity';

@Entity()
export class Movie extends BaseEntity {
  constructor(init?: Partial<Movie>) {
    super();
    Object.assign(this, init);
  }

  @Property()
  adult!: boolean;

  @Property()
  backdropPath?: string;

  @Property()
  title!: string;

  @Property()
  language!: string;

  @Property({ length: 1024 })
  description?: string;

  @Property()
  posterPath?: string;

  @Property()
  releaseDate!: string;

  @Property()
  originalTitle!: string;
}

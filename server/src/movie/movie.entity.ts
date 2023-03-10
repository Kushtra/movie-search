import { Entity, Property, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '@/common/base.entity';
import { UserMovieAction } from '@/userMovieAction/uma.entity';

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

  @OneToMany(() => UserMovieAction, uma => uma.movie)
  userMovieActions = new Collection<UserMovieAction>(this);
}

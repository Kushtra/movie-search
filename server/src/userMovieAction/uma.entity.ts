import { Entity, ManyToOne, Property, Unique, types } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/base.entity';
import { Movie } from 'src/movie/movie.entity';
import { User } from 'src/user/user.entity';

@Entity()
@Unique({ properties: ['movie', 'user'] })
export class UserMovieAction extends BaseEntity {
  constructor(init?: Partial<UserMovieAction>) {
    super();
    Object.assign(this, init);
  }

  @ManyToOne()
  movie!: Movie;

  @ManyToOne()
  user!: User;

  @Property()
  watched: boolean = false;

  @Property()
  watchLater: boolean = false;

  @Property()
  review?: string;

  @Property({ type: types.tinyint })
  rating?: number;
}

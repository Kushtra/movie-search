import { Entity, Enum, ManyToOne, Property, Unique } from '@mikro-orm/core';
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

  @Enum({ items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] })
  rating?: number;
}

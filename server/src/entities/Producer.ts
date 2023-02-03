import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Movie } from './Movie';

@Entity()
export class Producer {
  constructor(name: string) {
    this.name = name;
  }

  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @OneToMany(() => Movie, (movie) => movie.producer)
  movies = new Collection<Movie>(this);
}

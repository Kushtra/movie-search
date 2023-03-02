import { NotFoundError } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: EntityRepository<Movie>
  ) {}

  async fetchAll(limit: number = 20, offset?: number): Promise<Movie[]> {
    const movies = await this.movieRepository.findAll({ limit, offset }).catch(err => {
      console.error(err);
      throw new InternalServerErrorException();
    });
    return movies;
  }

  async fetchById(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOneOrFail({ id }).catch(err => {
      if (err instanceof NotFoundError) throw new NotFoundException('Movie not found');
      console.error(err);
      throw new InternalServerErrorException();
    });
    return movie;
  }
}

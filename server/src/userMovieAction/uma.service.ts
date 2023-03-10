import { NotFoundError, PopulateHint } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UniqueViolation } from '@/common/constants';
import { Movie } from '@/movie/movie.entity';
import { User } from '@/user/user.entity';
import { UserMovieAction } from '@/userMovieAction/uma.entity';

@Injectable()
export class UmaService {
  constructor(
    @InjectRepository(UserMovieAction)
    private readonly umaRepository: EntityRepository<UserMovieAction>
  ) {}

  async create(uma: UserMovieAction): Promise<number> {
    const id = await this.umaRepository.nativeInsert(uma).catch(err => {
      if (err?.code === UniqueViolation) throw new BadRequestException('User already has a record for this movie');
      console.error(err);
      throw new InternalServerErrorException();
    });
    return id;
  }

  async fetchOrCreate(userId: number, movieId: number): Promise<UserMovieAction> {
    try {
      const uma = await this.fetchByUserAndMovie(userId, movieId);
      return uma;
    } catch (err) {
      if (!(err instanceof NotFoundException)) throw err;
      const uma = new UserMovieAction({
        movie: new Movie({ id: movieId }),
        user: new User({ id: userId })
      });
      uma.id = await this.create(uma).catch(err => {
        console.error(err);
        throw new InternalServerErrorException();
      });
      return uma;
    }
  }

  async fetchByUserAndMovie(userId: number, movieId: number): Promise<UserMovieAction> {
    const uma = await this.umaRepository.findOneOrFail({ user: userId, movie: movieId }).catch(err => {
      if (err instanceof NotFoundError) throw new NotFoundException('User action not found for this movie');
      console.error(err);
      throw new InternalServerErrorException();
    });
    return uma;
  }

  async fetchManyByUserAndMovie(userIds: number[], movieIds: number[]): Promise<UserMovieAction[]> {
    const uma = await this.umaRepository
      .find({ $and: [{ user: { $in: userIds } }, { movie: { $in: movieIds } }] }, { populateWhere: PopulateHint.INFER })
      .catch(err => {
        console.error(err);
        throw new InternalServerErrorException();
      });
    return uma;
  }

  async update(uma: UserMovieAction): Promise<void> {
    await this.umaRepository.nativeUpdate({ id: uma.id }, uma).catch(err => {
      console.error(err);
      throw new InternalServerErrorException();
    });
  }

  async delete(id: number): Promise<void> {
    await this.umaRepository.nativeDelete({ id }).catch(err => {
      console.error(err);
      throw new InternalServerErrorException();
    });
  }
}

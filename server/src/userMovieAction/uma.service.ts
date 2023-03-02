import { NotFoundError } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UniqueViolation } from 'src/common/constants';
import { Movie } from 'src/movie/movie.entity';
import { User } from 'src/user/user.entity';
import { UserMovieAction } from './uma.entity';
import { UpdateUmaDto } from './uma.validator';

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

  async fetchByUserAndMovie(user: User, movie: Movie): Promise<UserMovieAction> {
    const uma = await this.umaRepository.findOneOrFail({ user, movie }).catch(err => {
      if (err instanceof NotFoundError) throw new NotFoundException('User action not found for this movie');
      console.error(err);
      throw new InternalServerErrorException();
    });
    return uma;
  }

  async update(id: number, umaData: UpdateUmaDto): Promise<void> {
    await this.umaRepository.nativeUpdate({ id }, umaData).catch(err => {
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

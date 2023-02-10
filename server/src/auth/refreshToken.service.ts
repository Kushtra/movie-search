import { NotFoundError } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { InternalServer, NotFound } from 'src/common/exceptions';
import { RefreshToken } from './refreshToken.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: EntityRepository<RefreshToken>
  ) {}

  async create(refreshToken: RefreshToken): Promise<number> {
    const id = await this.refreshTokenRepository.nativeInsert(refreshToken).catch(err => {
      console.error(err);
      throw new InternalServer();
    });

    return id;
  }

  async fetchById(id: number): Promise<RefreshToken> {
    const refreshToken = await this.refreshTokenRepository.findOneOrFail({ id }).catch(err => {
      if (err instanceof NotFoundError) throw new NotFound();
      console.error(err);
      throw new InternalServer();
    });

    return refreshToken;
  }

  async delete(id: number): Promise<void> {
    await this.refreshTokenRepository.nativeDelete({ id }).catch(err => {
      console.error(err);
      throw new InternalServer();
    });
  }
}

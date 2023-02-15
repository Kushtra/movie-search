import { NotFoundError } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UniqueViolation } from 'src/common/constants';
import { User } from './user.entity';
import { UpdateUserDto } from './user.validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {}

  async create(user: User): Promise<number> {
    const id = await this.userRepository.nativeInsert(user).catch(err => {
      if (err?.code === UniqueViolation) throw new BadRequestException('Email already in use');
      console.error(err);
      throw new InternalServerErrorException();
    });
    return id;
  }

  async fetchAll(limit: number = 10, offset?: number): Promise<User[]> {
    const users = await this.userRepository.findAll({ limit, offset }).catch(err => {
      console.error(err);
      throw new InternalServerErrorException();
    });
    return users;
  }

  async fetchById(id: number): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ id }).catch(err => {
      if (err instanceof NotFoundError) throw new NotFoundException('User not found');
      console.error(err);
      throw new InternalServerErrorException();
    });
    return user;
  }

  async fetchByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ email }).catch(err => {
      if (err instanceof NotFoundError) throw new NotFoundException('User not found');
      console.error(err);
      throw new InternalServerErrorException();
    });
    return user;
  }

  async update(id: number, userData: UpdateUserDto): Promise<void> {
    await this.userRepository.nativeUpdate({ id }, userData).catch(err => {
      if (err?.code === UniqueViolation) throw new BadRequestException('Email already in use');
      console.error(err);
      throw new InternalServerErrorException();
    });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.nativeDelete({ id }).catch(err => {
      console.error(err);
      throw new InternalServerErrorException();
    });
  }
}

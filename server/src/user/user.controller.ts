import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { BadRequest } from 'src/common/exceptions';
import { GuardedRequest } from 'src/common/interfaces/guardedRequest';
import { ParamNumValidator } from 'src/common/validators';
import { hashPassword } from 'src/lib/cryptography';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserValidator, UpdateUserDto, UpdateUserValidator } from './user.validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserBody: CreateUserDto): Promise<User> {
    const { username, password, email } = await CreateUserValidator.parseAsync(createUserBody).catch(() => {
      throw new BadRequest();
    });

    const hashedPassword = await hashPassword(password);

    const user = new User(username, email, hashedPassword);

    const id = await this.userService.create(user);

    user.id = id;

    return user;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.fetchAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me') // endpoint to test auth
  async test(@Req() req: GuardedRequest) {
    return this.userService.fetchById(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const validatedId = await ParamNumValidator.parseAsync(+id).catch(() => {
      throw new BadRequest();
    });

    const user = await this.userService.fetchById(validatedId);

    return user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserBody: UpdateUserDto): Promise<User> {
    const validatedId = await ParamNumValidator.parseAsync(+id).catch(() => {
      throw new BadRequest();
    });
    const userData = await UpdateUserValidator.parseAsync(updateUserBody).catch(() => {
      throw new BadRequest();
    });

    if (!Object.keys(userData).length) throw new BadRequest('No fields provided');

    const user = await this.userService.fetchById(validatedId);

    await this.userService.update(validatedId, userData);

    Object.assign(user, userData);

    return user;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const validatedId = await ParamNumValidator.parseAsync(+id).catch(() => {
      throw new BadRequest();
    });

    await this.userService.delete(validatedId);
  }
}

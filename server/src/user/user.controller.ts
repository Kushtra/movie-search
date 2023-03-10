import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { GuardedRequest } from '@/common/interfaces';
import { hashPassword } from '@/lib/cryptography';
import { User } from '@/user/user.entity';
import { UserService } from '@/user/user.service';
import { CreateUserDto, UpdateUserDto } from '@/user/user.validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hashPassword(createUserDto.password);
    const user = new User({ email: createUserDto.email, password: hashedPassword }); // await User.create(null, { email, password: hashedPassword });
    user.id = await this.userService.create(user);
    return user;
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.fetchAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  findSelf(@Req() req: GuardedRequest) {
    return this.userService.fetchById(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.fetchById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userService.fetchById(id);
    await this.userService.update(id, updateUserDto);
    Object.assign(user, updateUserDto);
    return user;
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}

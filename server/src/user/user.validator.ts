import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;
}

export class UpdateUserDto {
  @IsEmail()
  email?: string;

  @IsStrongPassword()
  password?: string;
}

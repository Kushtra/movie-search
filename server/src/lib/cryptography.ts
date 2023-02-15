import { compare, genSalt, hash } from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

export const comparePasswords = (rawPassword: string, hashedPassword: string): Promise<boolean> =>
  compare(rawPassword, hashedPassword);

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt: string = await genSalt();
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.error(err);
    throw new InternalServerErrorException();
  }
};

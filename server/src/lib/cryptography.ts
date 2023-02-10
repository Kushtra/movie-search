import { compare, genSalt, hash } from 'bcrypt';

export const comparePasswords = async (rawPassword: string, hashedPassword: string): Promise<boolean> =>
  compare(rawPassword, hashedPassword);

export const hashPassword = async (password: string): Promise<string> => {
  const salt: string = await genSalt();

  return hash(password, salt);
};

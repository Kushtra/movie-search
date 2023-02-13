import { compare, genSalt, hash } from 'bcrypt';
import { InternalServer } from 'src/common/exceptions';

export const comparePasswords = async (rawPassword: string, hashedPassword: string): Promise<boolean> => {
  const result = await compare(rawPassword, hashedPassword).catch(err => {
    console.error(err);
    throw new InternalServer();
  });

  return result;
};

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt: string = await genSalt();

    const hashedPassword = await hash(password, salt);

    return hashedPassword;
  } catch (err) {
    console.error(err);
    throw new InternalServer();
  }
};

import { z } from 'zod';

export const CreateUserValidator = z.object({
  username: z.string().min(4).max(24),
  password: z.string().min(6).max(32),
  email: z.string().email()
});
export type CreateUserDto = z.infer<typeof CreateUserValidator>;

export const UpdateUserValidator = z.object({
  username: z.string().min(4).max(24).optional(),
  password: z.string().min(6).max(32).optional(),
  email: z.string().email().optional()
});
export type UpdateUserDto = z.infer<typeof UpdateUserValidator>;

import { z } from 'zod';

export const CreateUserValidator = z.object({
  password: z.string().min(6).max(24),
  email: z.string().email()
});

export type CreateUserDto = z.infer<typeof CreateUserValidator>;

export const UpdateUserValidator = z.object({
  password: z.string().min(6).max(24).optional(),
  email: z.string().email().optional()
});

export type UpdateUserDto = z.infer<typeof UpdateUserValidator>;

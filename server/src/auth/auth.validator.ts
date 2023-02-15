import { z } from 'zod';

export const LoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(32)
});

export type LoginDto = z.infer<typeof LoginValidator>;

export const TokenRefreshValidator = z.object({
  refreshTokenStr: z.string()
});

export type TokenRefreshDto = z.infer<typeof TokenRefreshValidator>;

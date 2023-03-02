import { z } from 'zod';

export const CreateUmaValidator = z.object({
  movieId: z.number().int().min(1),
  watched: z.boolean().optional(),
  watchLater: z.boolean().optional(),
  review: z.string().optional(),
  rating: z.number().int().min(1).max(10)
});

export type CreateUmaDto = z.infer<typeof CreateUmaValidator>;

export const UpdateUmaValidator = z.object({
  watched: z.boolean().optional(),
  watchLater: z.boolean().optional(),
  review: z.string().optional(),
  rating: z.number().int().min(1).max(10).optional()
});

export type UpdateUmaDto = z.infer<typeof UpdateUmaValidator>;

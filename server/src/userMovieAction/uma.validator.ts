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

export const ReviewValidator = z.object({
  review: z.string()
});

export type ReviewDto = z.infer<typeof ReviewValidator>;

export const RatingValidator = z.object({
  rating: z.number().int().min(1).max(10)
});

export type RatingDto = z.infer<typeof RatingValidator>;

export const WatchLaterValidator = z.object({
  watchLater: z.boolean()
});

export type WatchLaterDto = z.infer<typeof WatchLaterValidator>;

export const WatchedValidator = z.object({
  watched: z.boolean()
});

export type WatchedDto = z.infer<typeof WatchedValidator>;

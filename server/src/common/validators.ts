import { z } from 'zod';

export const ParamNumValidator = z.number().int().min(1);

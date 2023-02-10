import { z } from 'zod';

export const ParamNumValidator = z.number().min(0);

import { z } from 'zod';
import { SitePage } from '../generated/prisma/enums';

const idParam = z.object({
  id: z.uuid(),
});


const heroBody = z.object({
  page: z.enum(SitePage),
  eyebrow: z.string().min(1).optional(),
  title: z.string().min(1),
  titleAccent: z.string().min(1).optional(),
  tagline: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  notice: z.string().min(1).optional(),
  imageUrl: z.string().min(1).optional(),
  primaryCtaLabel: z.string().min(1).optional(),
  primaryCtaHref: z.string().min(1).optional(),
  secondaryCtaLabel: z.string().min(1).optional(),
  secondaryCtaHref: z.string().min(1).optional(),
  highlights: z.array(z.string().min(1)).optional(),
  isActive: z.boolean(),
});

const atLeastOneField = <T extends z.ZodObject<z.ZodRawShape>>(schema: T) =>
  schema.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

export const getHeroesSchema = z.object({
  query: z.object({
    page: z.enum(SitePage).optional(),
  }),
});

export const getHeroSchema = z.object({
  params: idParam,
});

export const createHeroSchema = z.object({
  body: heroBody.extend({
    isActive: z.boolean().optional(),
  }),
});

export const updateHeroSchema = z.object({
  params: idParam,
  body: atLeastOneField(heroBody),
});

export const deleteHeroSchema = z.object({
  params: idParam,
});

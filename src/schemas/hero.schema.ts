import { z } from 'zod';
import { SitePage } from '../generated/prisma/enums';
import { optionalStoredImageUrl } from './image.schema';

const idParam = z.object({
  id: z.uuid(),
});


const optionalNullableString = z.string().min(1).optional().nullable();

const heroBody = z.object({
  page: z.enum(SitePage),
  eyebrow: optionalNullableString,
  title: z.string().min(1),
  titleAccent: optionalNullableString,
  tagline: optionalNullableString,
  description: optionalNullableString,
  notice: optionalNullableString,
  imageUrl: optionalStoredImageUrl,
  primaryCtaLabel: optionalNullableString,
  primaryCtaHref: optionalNullableString,
  secondaryCtaLabel: optionalNullableString,
  secondaryCtaHref: optionalNullableString,
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

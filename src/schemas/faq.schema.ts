import { z } from 'zod';
import { FaqPage } from '../generated/prisma/enums';
import { paginationQueryFields } from '../utils/pagination';

const idParam = z.object({
  id: z.uuid(),
});

const faqBody = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  categoryId: z.uuid(),
  sortOrder: z.number().int().min(0),
  isActive: z.boolean(),
});

const faqCategoryBody = z.object({
  page: z.enum(FaqPage),
  label: z.string().min(1),
  title: z.string().min(1),
  sortOrder: z.number().int().min(0),
  isActive: z.boolean(),
});

const atLeastOneField = <T extends z.ZodObject<z.ZodRawShape>>(schema: T) =>
  schema.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

// ——— FAQs ———

export const getFaqsSchema = z.object({
  query: z.object({
    ...paginationQueryFields,
    faqPage: z.enum(FaqPage).optional(),
    categoryId: z.uuid().optional(),
    isActive: z.enum(['true', 'false']).optional(),
  }),
});

export const getFaqSchema = z.object({
  params: idParam,
});

export const createFaqSchema = z.object({
  body: faqBody.extend({
    isActive: z.boolean().optional(),
  }),
});

export const updateFaqSchema = z.object({
  params: idParam,
  body: atLeastOneField(faqBody),
});

export const deleteFaqSchema = z.object({
  params: idParam,
});

// ——— FAQ categories ———

export const getFaqCategoriesSchema = z.object({
  query: z.object({
    faqPage: z.enum(FaqPage).optional(),
    includeFaqs: z.enum(['true', 'false']).optional(),
  }),
});

export const getFaqCategorySchema = z.object({
  params: idParam,
  query: z.object({
    includeFaqs: z.enum(['true', 'false']).optional(),
  }),
});

export const createFaqCategorySchema = z.object({
  body: faqCategoryBody.extend({
    isActive: z.boolean().optional(),
  }),
});

export const updateFaqCategorySchema = z.object({
  params: idParam,
  body: atLeastOneField(faqCategoryBody),
});

export const deleteFaqCategorySchema = z.object({
  params: idParam,
});

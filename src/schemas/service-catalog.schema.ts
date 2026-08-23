import { z } from 'zod';
import { CategoryPriceKind } from '../generated/prisma/enums';
import { paginationQueryFields } from '../utils/pagination';

const idParam = z.object({
  id: z.uuid(),
});

const atLeastOneField = <T extends z.ZodObject<z.ZodRawShape>>(schema: T) =>
  schema.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

const optionalNullableString = z.string().min(1).optional().nullable();

const optionalActiveQuery = z.object({
  query: z.object({
    isActive: z.enum(['true', 'false']).optional(),
  }),
});

// -- Currency --

const currencyBody = z.object({
  code: z.string().min(1).max(10),
  symbol: z.string().min(1).max(8),
  name: z.string().min(1),
  isActive: z.boolean(),
});

export const getCurrenciesSchema = optionalActiveQuery;
export const getCurrencySchema = z.object({ params: idParam });
export const createCurrencySchema = z.object({
  body: currencyBody.extend({ isActive: z.boolean().optional() }),
});
export const updateCurrencySchema = z.object({
  params: idParam,
  body: atLeastOneField(currencyBody),
});
export const deleteCurrencySchema = z.object({ params: idParam });

// -- Service category --

const serviceCategoryBody = z.object({
  name: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Slug must be lowercase kebab-case',
    }),
  eyebrow: z.string().min(1),
  titleAccent: optionalNullableString,
  subtitle: z.string().min(1),
  introEyebrow: optionalNullableString,
  tagline: optionalNullableString,
  pricingSubtitle: optionalNullableString,
  note: optionalNullableString,
  cardBlurb: optionalNullableString,
  imageUrl: optionalNullableString,
  highlights: z.array(z.string().min(1)).optional(),
  currencyId: z.uuid(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
});

export const getServiceCategoriesSchema = optionalActiveQuery;
export const getServiceCategorySchema = z.object({ params: idParam });
export const createServiceCategorySchema = z.object({
  body: serviceCategoryBody.extend({ isActive: z.boolean().optional() }),
});
export const updateServiceCategorySchema = z.object({
  params: idParam,
  body: atLeastOneField(serviceCategoryBody),
});
export const deleteServiceCategorySchema = z.object({ params: idParam });

// -- Service --

const serviceBody = z.object({
  categoryId: z.uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  imageUrl: optionalNullableString,
  badge: optionalNullableString,
  sortOrder: z.number().int(),
  isActive: z.boolean(),
});

export const getServicesSchema = z.object({
  query: z.object({
    ...paginationQueryFields,
    categoryId: z.uuid().optional(),
    isActive: z.enum(['true', 'false']).optional(),
  }),
});
export const getServiceSchema = z.object({ params: idParam });
export const createServiceSchema = z.object({
  body: serviceBody.extend({ isActive: z.boolean().optional() }),
});
export const updateServiceSchema = z.object({
  params: idParam,
  body: atLeastOneField(serviceBody),
});
export const deleteServiceSchema = z.object({ params: idParam });

// -- Category price --

const categoryPriceBody = z.object({
  categoryId: z.uuid(),
  label: z.string().min(1),
  description: optionalNullableString,
  price: z.number().int().nonnegative(),
  kind: z.enum(CategoryPriceKind),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
});

export const getCategoryPricesSchema = z.object({
  query: z.object({
    ...paginationQueryFields,
    categoryId: z.uuid().optional(),
    kind: z.enum(CategoryPriceKind).optional(),
    isActive: z.enum(['true', 'false']).optional(),
  }),
});
export const getCategoryPriceSchema = z.object({ params: idParam });
export const createCategoryPriceSchema = z.object({
  body: categoryPriceBody.extend({ isActive: z.boolean().optional() }),
});
export const updateCategoryPriceSchema = z.object({
  params: idParam,
  body: atLeastOneField(categoryPriceBody),
});
export const deleteCategoryPriceSchema = z.object({ params: idParam });

// -- Category addon --

const categoryAddonBody = z.object({
  categoryId: z.uuid(),
  name: z.string().min(1),
  description: optionalNullableString,
  price: z.number().int().nonnegative(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
});

export const getCategoryAddonsSchema = z.object({
  query: z.object({
    ...paginationQueryFields,
    categoryId: z.uuid().optional(),
    isActive: z.enum(['true', 'false']).optional(),
  }),
});
export const getCategoryAddonSchema = z.object({ params: idParam });
export const createCategoryAddonSchema = z.object({
  body: categoryAddonBody.extend({ isActive: z.boolean().optional() }),
});
export const updateCategoryAddonSchema = z.object({
  params: idParam,
  body: atLeastOneField(categoryAddonBody),
});
export const deleteCategoryAddonSchema = z.object({ params: idParam });

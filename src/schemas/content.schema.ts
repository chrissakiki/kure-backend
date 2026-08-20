import { z } from 'zod';
import { SitePage } from '../generated/prisma/enums';

const idParam = z.object({
  id: z.uuid(),
});

const atLeastOneField = <T extends z.ZodObject<z.ZodRawShape>>(schema: T) =>
  schema.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

const sectionIntroBody = z.object({
  page: z.enum(SitePage),
  sectionKey: z.string().min(1),
  eyebrow: z.string().min(1).optional().nullable(),
  title: z.string().min(1),
  titleAccent: z.string().min(1).optional().nullable(),
  description: z.string().min(1).optional().nullable(),
  isActive: z.boolean(),
});

const offerCardBody = z.object({
  page: z.enum(SitePage),
  sectionKey: z.string().min(1),
  name: z.string().min(1),
  imageUrl: z.string().min(1).optional().nullable(),
  subtitle: z.string().min(1).optional().nullable(),
  badge: z.string().min(1).optional().nullable(),
  price: z.string(),
  priceNote: z.string().min(1).optional().nullable(),
  perks: z.array(z.string().min(1)).optional(),
  ctaLabel: z.string().min(1).optional().nullable(),
  ctaHref: z.string().min(1).optional().nullable(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
});

const featureItemBody = z.object({
  page: z.enum(SitePage),
  sectionKey: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1).optional().nullable(),
  content: z.string().min(1).optional().nullable(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
});

const stepItemBody = z.object({
  page: z.enum(SitePage),
  sectionKey: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
});

const contentQuerySchema = z.object({
  query: z.object({
    page: z.enum(SitePage).optional(),
    sectionKey: z.string().min(1).optional(),
  }),
});

export const getSectionIntrosSchema = contentQuerySchema;
export const getSectionIntroSchema = z.object({ params: idParam });
export const createSectionIntroSchema = z.object({
  body: sectionIntroBody.extend({ isActive: z.boolean().optional() }),
});
export const updateSectionIntroSchema = z.object({
  params: idParam,
  body: atLeastOneField(sectionIntroBody),
});
export const deleteSectionIntroSchema = z.object({ params: idParam });

const sectionOutroBody = z.object({
  page: z.enum(SitePage),
  eyebrow: z.string().min(1).optional().nullable(),
  title: z.string().min(1),
  titleAccent: z.string().min(1).optional().nullable(),
  description: z.string().min(1).optional().nullable(),
  primaryCtaLabel: z.string().min(1).optional().nullable(),
  primaryCtaHref: z.string().min(1).optional().nullable(),
  secondaryCtaLabel: z.string().min(1).optional().nullable(),
  secondaryCtaHref: z.string().min(1).optional().nullable(),
  isActive: z.boolean(),
});

export const getSectionOutrosSchema = z.object({
  query: z.object({
    page: z.enum(SitePage).optional(),
  }),
});
export const getSectionOutroSchema = z.object({ params: idParam });
export const updateSectionOutroSchema = z.object({
  params: idParam,
  body: atLeastOneField(sectionOutroBody),
});

export const getOfferCardsSchema = contentQuerySchema;
export const getOfferCardSchema = z.object({ params: idParam });
export const createOfferCardSchema = z.object({
  body: offerCardBody.extend({ isActive: z.boolean().optional() }),
});
export const updateOfferCardSchema = z.object({
  params: idParam,
  body: atLeastOneField(offerCardBody),
});
export const deleteOfferCardSchema = z.object({ params: idParam });

export const getFeatureItemsSchema = contentQuerySchema;
export const getFeatureItemSchema = z.object({ params: idParam });
export const createFeatureItemSchema = z.object({
  body: featureItemBody.extend({ isActive: z.boolean().optional() }),
});
export const updateFeatureItemSchema = z.object({
  params: idParam,
  body: atLeastOneField(featureItemBody),
});
export const deleteFeatureItemSchema = z.object({ params: idParam });

export const getStepItemsSchema = contentQuerySchema;
export const getStepItemSchema = z.object({ params: idParam });
export const createStepItemSchema = z.object({
  body: stepItemBody.extend({ isActive: z.boolean().optional() }),
});
export const updateStepItemSchema = z.object({
  params: idParam,
  body: atLeastOneField(stepItemBody),
});
export const deleteStepItemSchema = z.object({ params: idParam });

export const getLegalDocumentsSchema = z.object({
  query: z.object({
    page: z.enum(SitePage).optional(),
  }),
});
export const getLegalDocumentSchema = z.object({ params: idParam });
export const updateLegalDocumentSchema = z.object({
  params: idParam,
  body: z.object({
    content: z.string().min(1),
  }),
});

const contentBlockBody = z.object({
  page: z.enum(SitePage),
  sectionKey: z.string().min(1),
  content: z.string().min(1),
  isActive: z.boolean(),
});

export const getContentBlocksSchema = contentQuerySchema;
export const getContentBlockSchema = z.object({ params: idParam });
export const createContentBlockSchema = z.object({
  body: contentBlockBody.extend({ isActive: z.boolean().optional() }),
});
export const updateContentBlockSchema = z.object({
  params: idParam,
  body: atLeastOneField(contentBlockBody),
});
export const deleteContentBlockSchema = z.object({ params: idParam });

const milestoneStatBody = z.object({
  page: z.enum(SitePage),
  sectionKey: z.string().min(1),
  value: z.string().min(1),
  label: z.string().min(1),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
});

export const getMilestoneStatsSchema = contentQuerySchema;
export const getMilestoneStatSchema = z.object({ params: idParam });
export const createMilestoneStatSchema = z.object({
  body: milestoneStatBody.extend({ isActive: z.boolean().optional() }),
});
export const updateMilestoneStatSchema = z.object({
  params: idParam,
  body: atLeastOneField(milestoneStatBody),
});
export const deleteMilestoneStatSchema = z.object({ params: idParam });

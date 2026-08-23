import { z } from 'zod';

export const getFaqPageSchema = z.object({});
export const getTestimonialsPageSchema = z.object({});
export const getTermsPageSchema = z.object({});
export const getPrivacyPageSchema = z.object({});
export const getAboutPageSchema = z.object({});
export const getLocationsPageSchema = z.object({});
export const getGiftVouchersPageSchema = z.object({});
export const getPackagesPageSchema = z.object({});
export const getCareersPageSchema = z.object({});
export const getCorporatePageSchema = z.object({});
export const getAcademyPageSchema = z.object({});
export const getServicesPageSchema = z.object({});
export const getHomePageSchema = z.object({});
export const getServiceCategoryPageSchema = z.object({
  params: z.object({
    slug: z.string().min(1),
  }),
});

import { z } from 'zod';

const idParam = z.object({
  id: z.uuid(),
});

const testimonialBody = z.object({
  name: z.string().min(1),
  content: z.string().min(1),
  subtitle: z.string().min(1),
  categoryId: z.uuid(),
  sortOrder: z.number().int().min(0),
  isActive: z.boolean(),
});

const testimonialCategoryBody = z.object({
  label: z.string().min(1),
  title: z.string().min(1),
  sortOrder: z.number().int().min(0),
  isActive: z.boolean(),
});

const atLeastOneField = <T extends z.ZodObject<z.ZodRawShape>>(schema: T) =>
  schema.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

// ——— Testimonials ———

export const getTestimonialSchema = z.object({
  params: idParam,
});

export const createTestimonialSchema = z.object({
  body: testimonialBody.extend({
    isActive: z.boolean().optional(),
  }),
});

export const updateTestimonialSchema = z.object({
  params: idParam,
  body: atLeastOneField(testimonialBody),
});

export const deleteTestimonialSchema = z.object({
  params: idParam,
});

// ——— Testimonial categories ———

export const getTestimonialCategorySchema = z.object({
  params: idParam,
});

export const createTestimonialCategorySchema = z.object({
  body: testimonialCategoryBody.extend({
    isActive: z.boolean().optional(),
  }),
});

export const updateTestimonialCategorySchema = z.object({
  params: idParam,
  body: atLeastOneField(testimonialCategoryBody),
});

export const deleteTestimonialCategorySchema = z.object({
  params: idParam,
});

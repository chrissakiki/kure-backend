import { z } from 'zod';
import { JobOpeningStatus } from '../generated/prisma/enums';

const idParam = z.object({
  id: z.uuid(),
});

const atLeastOneField = <T extends z.ZodObject<z.ZodRawShape>>(schema: T) =>
  schema.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

const jobOpeningBody = z.object({
  title: z.string().min(1),
  status: z.enum(JobOpeningStatus),
  employmentTypes: z.array(z.string().min(1)).optional(),
  locations: z.array(z.string().min(1)).optional(),
  description: z.string().min(1),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
});

export const getJobOpeningsSchema = z.object({
  query: z.object({
    status: z.enum(JobOpeningStatus).optional(),
  }),
});
export const getJobOpeningSchema = z.object({ params: idParam });
export const createJobOpeningSchema = z.object({
  body: jobOpeningBody.extend({ isActive: z.boolean().optional() }),
});
export const updateJobOpeningSchema = z.object({
  params: idParam,
  body: atLeastOneField(jobOpeningBody),
});
export const deleteJobOpeningSchema = z.object({ params: idParam });

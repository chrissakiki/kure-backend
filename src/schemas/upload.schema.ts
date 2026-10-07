import { z } from 'zod';
import { IMAGE_CONTENT_TYPES, IMAGE_FOLDERS } from '../utils/s3';

export const presignUploadSchema = z.object({
  body: z.object({
    folder: z.enum(IMAGE_FOLDERS),
    contentType: z.enum(IMAGE_CONTENT_TYPES),
  }),
});

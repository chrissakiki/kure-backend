import { z } from 'zod';

export const optionalStoredImageUrl = z.url().optional().nullable();

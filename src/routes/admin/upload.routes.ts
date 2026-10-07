import { Router } from 'express';
import { presignUpload } from '../../controllers/admin/upload.controller';
import { validate } from '../../middleware/validate.middleware';
import { presignUploadSchema } from '../../schemas/upload.schema';

const router = Router();

router.post('/presign', validate(presignUploadSchema), presignUpload);

export default router;

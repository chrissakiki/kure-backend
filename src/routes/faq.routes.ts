import { Router } from 'express';
import { getFaqs } from '../controllers/faq.controller';
import { validate } from '../middleware/validate';
import { getPublicFaqsSchema } from '../schemas/faq.schema';

const router = Router();

// GET /api/faqs
router.get('/', validate(getPublicFaqsSchema), getFaqs);

export default router;

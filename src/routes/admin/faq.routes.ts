import { Router } from 'express';
import {
  createFaq,
  createFaqCategory,
  deleteFaq,
  deleteFaqCategory,
  getFaq,
  getFaqCategories,
  getFaqCategory,
  getFaqs,
  updateFaq,
  updateFaqCategory,
} from '../../controllers/admin/faq.controller';
import { validate } from '../../middleware/validate.middleware';
import {
  createFaqCategorySchema,
  createFaqSchema,
  deleteFaqCategorySchema,
  deleteFaqSchema,
  getFaqCategoriesSchema,
  getFaqCategorySchema,
  getFaqSchema,
  getFaqsSchema,
  updateFaqCategorySchema,
  updateFaqSchema,
} from '../../schemas/faq.schema';

const router = Router();

// GET /api/admin/faqs
router.get('/', validate(getFaqsSchema), getFaqs);
// POST /api/admin/faqs
router.post('/', validate(createFaqSchema), createFaq);

// GET /api/admin/faqs/categories
router.get('/categories', validate(getFaqCategoriesSchema), getFaqCategories);
// POST /api/admin/faqs/categories
router.post('/categories', validate(createFaqCategorySchema), createFaqCategory);
// GET /api/admin/faqs/categories/:id
router.get('/categories/:id', validate(getFaqCategorySchema), getFaqCategory);
// PUT /api/admin/faqs/categories/:id
router.put('/categories/:id', validate(updateFaqCategorySchema), updateFaqCategory);
// DELETE /api/admin/faqs/categories/:id
router.delete('/categories/:id', validate(deleteFaqCategorySchema), deleteFaqCategory);

// GET /api/admin/faqs/:id
router.get('/:id', validate(getFaqSchema), getFaq);
// PUT /api/admin/faqs/:id
router.put('/:id', validate(updateFaqSchema), updateFaq);
// DELETE /api/admin/faqs/:id
router.delete('/:id', validate(deleteFaqSchema), deleteFaq);

export default router;

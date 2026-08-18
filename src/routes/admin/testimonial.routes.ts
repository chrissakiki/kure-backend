import { Router } from 'express';
import {
  createTestimonial,
  createTestimonialCategory,
  deleteTestimonial,
  deleteTestimonialCategory,
  getTestimonial,
  getTestimonialCategories,
  getTestimonialCategory,
  getTestimonials,
  updateTestimonial,
  updateTestimonialCategory,
} from '../../controllers/admin/testimonial.controller';
import { validate } from '../../middleware/validate.middleware';
import {
  createTestimonialCategorySchema,
  createTestimonialSchema,
  deleteTestimonialCategorySchema,
  deleteTestimonialSchema,
  getTestimonialCategorySchema,
  getTestimonialSchema,
  updateTestimonialCategorySchema,
  updateTestimonialSchema,
} from '../../schemas/testimonial.schema';

const router = Router();

// GET /api/admin/testimonials
router.get('/', getTestimonials);
// POST /api/admin/testimonials
router.post('/', validate(createTestimonialSchema), createTestimonial);

// GET /api/admin/testimonials/categories
router.get('/categories', getTestimonialCategories);
// POST /api/admin/testimonials/categories
router.post('/categories', validate(createTestimonialCategorySchema), createTestimonialCategory);
// GET /api/admin/testimonials/categories/:id
router.get('/categories/:id', validate(getTestimonialCategorySchema), getTestimonialCategory);
// PUT /api/admin/testimonials/categories/:id
router.put('/categories/:id', validate(updateTestimonialCategorySchema), updateTestimonialCategory);
// DELETE /api/admin/testimonials/categories/:id
router.delete('/categories/:id', validate(deleteTestimonialCategorySchema), deleteTestimonialCategory);

// GET /api/admin/testimonials/:id
router.get('/:id', validate(getTestimonialSchema), getTestimonial);
// PUT /api/admin/testimonials/:id
router.put('/:id', validate(updateTestimonialSchema), updateTestimonial);
// DELETE /api/admin/testimonials/:id
router.delete('/:id', validate(deleteTestimonialSchema), deleteTestimonial);

export default router;

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
  getTestimonialCategoriesSchema,
  getTestimonialCategorySchema,
  getTestimonialsSchema,
  getTestimonialSchema,
  updateTestimonialCategorySchema,
  updateTestimonialSchema,
} from '../../schemas/testimonial.schema';

const router = Router();

router.get('/', validate(getTestimonialsSchema), getTestimonials);
router.post('/', validate(createTestimonialSchema), createTestimonial);

router.get(
  '/categories',
  validate(getTestimonialCategoriesSchema),
  getTestimonialCategories,
);
router.post(
  '/categories',
  validate(createTestimonialCategorySchema),
  createTestimonialCategory,
);
router.get(
  '/categories/:id',
  validate(getTestimonialCategorySchema),
  getTestimonialCategory,
);
router.put(
  '/categories/:id',
  validate(updateTestimonialCategorySchema),
  updateTestimonialCategory,
);
router.delete(
  '/categories/:id',
  validate(deleteTestimonialCategorySchema),
  deleteTestimonialCategory,
);

router.get('/:id', validate(getTestimonialSchema), getTestimonial);
router.put('/:id', validate(updateTestimonialSchema), updateTestimonial);
router.delete('/:id', validate(deleteTestimonialSchema), deleteTestimonial);

export default router;

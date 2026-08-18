import { Router } from 'express';
import { getTestimonials } from '../controllers/testimonial.controller';

const router = Router();

// GET /api/testimonials
router.get('/', getTestimonials);

export default router;

import { Router } from 'express';
import faqRoutes from './faq.routes';
import testimonialRoutes from './testimonial.routes';
import { authMiddleware, requireAdmin } from '../../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware, requireAdmin);
router.use('/faqs', faqRoutes);
router.use('/testimonials', testimonialRoutes);

export default router;

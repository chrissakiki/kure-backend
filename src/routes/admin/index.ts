import { Router } from 'express';
import faqRoutes from './faq.routes';
import testimonialRoutes from './testimonial.routes';
import heroRoutes from './hero.routes';
import contentRoutes from './content.routes';
import jobOpeningRoutes from './job-opening.routes';
import { authMiddleware, requireAdmin } from '../../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware, requireAdmin);
router.use('/faqs', faqRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/heroes', heroRoutes);
router.use('/content', contentRoutes);
router.use('/job-openings', jobOpeningRoutes);

export default router;

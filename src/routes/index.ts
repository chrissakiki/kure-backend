import { Router } from 'express';
import faqRoutes from './faq.routes';
import adminRoutes from './admin';
import testimonialRoutes from './testimonial.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/faqs', faqRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/admin', adminRoutes);

export default router;

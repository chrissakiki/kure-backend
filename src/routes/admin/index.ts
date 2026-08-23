import { Router } from 'express';
import faqRoutes from './faq.routes';
import testimonialRoutes from './testimonial.routes';
import heroRoutes from './hero.routes';
import contentRoutes from './content.routes';
import jobOpeningRoutes from './job-opening.routes';
import {
  categoryAddonRoutes,
  categoryPriceRoutes,
  currencyRoutes,
  serviceCategoryRoutes,
  serviceRoutes,
} from './service-catalog.routes';
import { authMiddleware, requireAdmin } from '../../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware, requireAdmin);
router.use('/faqs', faqRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/heroes', heroRoutes);
router.use('/content', contentRoutes);
router.use('/job-openings', jobOpeningRoutes);
router.use('/currencies', currencyRoutes);
router.use('/service-categories', serviceCategoryRoutes);
router.use('/services', serviceRoutes);
router.use('/category-prices', categoryPriceRoutes);
router.use('/category-addons', categoryAddonRoutes);

export default router;

import { Router } from 'express';
import {
  getAboutPage,
  getAcademyPage,
  getFaqPage,
  getGiftVouchersPage,
  getHomePage,
  getLocationsPage,
  getPackagesPage,
  getCareersPage,
  getCorporatePage,
  getPrivacyPage,
  getServiceCategoryPage,
  getServicesPage,
  getTermsPage,
  getTestimonialsPage,
} from '../controllers/page.controller';
import { validate } from '../middleware/validate.middleware';
import {
  getAboutPageSchema,
  getAcademyPageSchema,
  getFaqPageSchema,
  getGiftVouchersPageSchema,
  getHomePageSchema,
  getLocationsPageSchema,
  getPackagesPageSchema,
  getCareersPageSchema,
  getCorporatePageSchema,
  getPrivacyPageSchema,
  getServiceCategoryPageSchema,
  getServicesPageSchema,
  getTermsPageSchema,
  getTestimonialsPageSchema,
} from '../schemas/page.schema';

const router = Router();

router.get('/home', validate(getHomePageSchema), getHomePage);
router.get('/faq', validate(getFaqPageSchema), getFaqPage);
router.get('/testimonials', validate(getTestimonialsPageSchema), getTestimonialsPage);
router.get('/terms', validate(getTermsPageSchema), getTermsPage);
router.get('/privacy', validate(getPrivacyPageSchema), getPrivacyPage);
router.get('/about', validate(getAboutPageSchema), getAboutPage);
router.get('/locations', validate(getLocationsPageSchema), getLocationsPage);
router.get('/gift-vouchers', validate(getGiftVouchersPageSchema), getGiftVouchersPage);
router.get('/packages', validate(getPackagesPageSchema), getPackagesPage);
router.get('/careers', validate(getCareersPageSchema), getCareersPage);
router.get('/corporate', validate(getCorporatePageSchema), getCorporatePage);
router.get('/academy', validate(getAcademyPageSchema), getAcademyPage);
router.get('/services', validate(getServicesPageSchema), getServicesPage);
router.get(
  '/services/:slug',
  validate(getServiceCategoryPageSchema),
  getServiceCategoryPage,
);

export default router;

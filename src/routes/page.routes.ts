import { Router } from 'express';
import {
  getAboutPage,
  getFaqPage,
  getGiftVouchersPage,
  getLocationsPage,
  getPackagesPage,
  getCareersPage,
  getPrivacyPage,
  getTermsPage,
  getTestimonialsPage,
} from '../controllers/page.controller';
import { validate } from '../middleware/validate.middleware';
import {
  getAboutPageSchema,
  getFaqPageSchema,
  getGiftVouchersPageSchema,
  getLocationsPageSchema,
  getPackagesPageSchema,
  getCareersPageSchema,
  getPrivacyPageSchema,
  getTermsPageSchema,
  getTestimonialsPageSchema,
} from '../schemas/page.schema';

const router = Router();

router.get('/faq', validate(getFaqPageSchema), getFaqPage);
router.get('/testimonials', validate(getTestimonialsPageSchema), getTestimonialsPage);
router.get('/terms', validate(getTermsPageSchema), getTermsPage);
router.get('/privacy', validate(getPrivacyPageSchema), getPrivacyPage);
router.get('/about', validate(getAboutPageSchema), getAboutPage);
router.get('/locations', validate(getLocationsPageSchema), getLocationsPage);
router.get('/gift-vouchers', validate(getGiftVouchersPageSchema), getGiftVouchersPage);
router.get('/packages', validate(getPackagesPageSchema), getPackagesPage);
router.get('/careers', validate(getCareersPageSchema), getCareersPage);

export default router;

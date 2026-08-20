import { Router } from 'express';
import { validate } from '../../middleware/validate.middleware';
import {
  createContentBlock,
  createFeatureItem,
  createMilestoneStat,
  createOfferCard,
  createSectionIntro,
  createStepItem,
  deleteContentBlock,
  deleteFeatureItem,
  deleteMilestoneStat,
  deleteOfferCard,
  deleteSectionIntro,
  deleteStepItem,
  getContentBlock,
  getContentBlocks,
  getFeatureItem,
  getFeatureItems,
  getLegalDocument,
  getLegalDocuments,
  getMilestoneStat,
  getMilestoneStats,
  getOfferCard,
  getOfferCards,
  getSectionIntro,
  getSectionIntros,
  getSectionOutro,
  getSectionOutros,
  getStepItem,
  getStepItems,
  updateContentBlock,
  updateFeatureItem,
  updateLegalDocument,
  updateMilestoneStat,
  updateOfferCard,
  updateSectionIntro,
  updateSectionOutro,
  updateStepItem,
} from '../../controllers/admin/content.controller';
import {
  createContentBlockSchema,
  createFeatureItemSchema,
  createMilestoneStatSchema,
  createOfferCardSchema,
  createSectionIntroSchema,
  createStepItemSchema,
  deleteContentBlockSchema,
  deleteFeatureItemSchema,
  deleteMilestoneStatSchema,
  deleteOfferCardSchema,
  deleteSectionIntroSchema,
  deleteStepItemSchema,
  getContentBlockSchema,
  getContentBlocksSchema,
  getFeatureItemSchema,
  getFeatureItemsSchema,
  getLegalDocumentSchema,
  getLegalDocumentsSchema,
  getMilestoneStatSchema,
  getMilestoneStatsSchema,
  getOfferCardSchema,
  getOfferCardsSchema,
  getSectionIntroSchema,
  getSectionIntrosSchema,
  getSectionOutroSchema,
  getSectionOutrosSchema,
  getStepItemSchema,
  getStepItemsSchema,
  updateContentBlockSchema,
  updateFeatureItemSchema,
  updateLegalDocumentSchema,
  updateMilestoneStatSchema,
  updateOfferCardSchema,
  updateSectionIntroSchema,
  updateSectionOutroSchema,
  updateStepItemSchema,
} from '../../schemas/content.schema';

const router = Router();

router.get('/section-intros', validate(getSectionIntrosSchema), getSectionIntros);
router.post('/section-intros', validate(createSectionIntroSchema), createSectionIntro);
router.get('/section-intros/:id', validate(getSectionIntroSchema), getSectionIntro);
router.put('/section-intros/:id', validate(updateSectionIntroSchema), updateSectionIntro);
router.delete('/section-intros/:id', validate(deleteSectionIntroSchema), deleteSectionIntro);

router.get('/section-outros', validate(getSectionOutrosSchema), getSectionOutros);
router.get('/section-outros/:id', validate(getSectionOutroSchema), getSectionOutro);
router.put('/section-outros/:id', validate(updateSectionOutroSchema), updateSectionOutro);

router.get('/offer-cards', validate(getOfferCardsSchema), getOfferCards);
router.post('/offer-cards', validate(createOfferCardSchema), createOfferCard);
router.get('/offer-cards/:id', validate(getOfferCardSchema), getOfferCard);
router.put('/offer-cards/:id', validate(updateOfferCardSchema), updateOfferCard);
router.delete('/offer-cards/:id', validate(deleteOfferCardSchema), deleteOfferCard);

router.get('/feature-items', validate(getFeatureItemsSchema), getFeatureItems);
router.post('/feature-items', validate(createFeatureItemSchema), createFeatureItem);
router.get('/feature-items/:id', validate(getFeatureItemSchema), getFeatureItem);
router.put('/feature-items/:id', validate(updateFeatureItemSchema), updateFeatureItem);
router.delete('/feature-items/:id', validate(deleteFeatureItemSchema), deleteFeatureItem);

router.get('/step-items', validate(getStepItemsSchema), getStepItems);
router.post('/step-items', validate(createStepItemSchema), createStepItem);
router.get('/step-items/:id', validate(getStepItemSchema), getStepItem);
router.put('/step-items/:id', validate(updateStepItemSchema), updateStepItem);
router.delete('/step-items/:id', validate(deleteStepItemSchema), deleteStepItem);

router.get('/legal-documents', validate(getLegalDocumentsSchema), getLegalDocuments);
router.get('/legal-documents/:id', validate(getLegalDocumentSchema), getLegalDocument);
router.put('/legal-documents/:id', validate(updateLegalDocumentSchema), updateLegalDocument);

router.get('/content-blocks', validate(getContentBlocksSchema), getContentBlocks);
router.post('/content-blocks', validate(createContentBlockSchema), createContentBlock);
router.get('/content-blocks/:id', validate(getContentBlockSchema), getContentBlock);
router.put('/content-blocks/:id', validate(updateContentBlockSchema), updateContentBlock);
router.delete('/content-blocks/:id', validate(deleteContentBlockSchema), deleteContentBlock);

router.get('/milestone-stats', validate(getMilestoneStatsSchema), getMilestoneStats);
router.post('/milestone-stats', validate(createMilestoneStatSchema), createMilestoneStat);
router.get('/milestone-stats/:id', validate(getMilestoneStatSchema), getMilestoneStat);
router.put('/milestone-stats/:id', validate(updateMilestoneStatSchema), updateMilestoneStat);
router.delete('/milestone-stats/:id', validate(deleteMilestoneStatSchema), deleteMilestoneStat);

export default router;

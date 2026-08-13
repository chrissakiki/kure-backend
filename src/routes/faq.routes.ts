import { Router } from 'express';
import {
  createFaqCategory,
  getFaq,
  getFaqCategories,
  getFaqCategory,
  getFaqs,
} from '../controllers/faq.controller';

const router = Router();

// GET /faqs
router.get('/', getFaqs);

// Categories
// GET /faqs/categories
router.get('/categories', getFaqCategories);
// POST /faqs/categories (CREATE)
router.post('/categories', createFaqCategory);
// GET /faqs/categories/:id
router.get('/categories/:id', getFaqCategory);


// GET /faqs/:id
router.get('/:id', getFaq);



export default router;

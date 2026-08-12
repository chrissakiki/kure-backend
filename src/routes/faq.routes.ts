import { Router } from "express";
import { getFaqsController } from '../controllers/faq.controller';

const router = Router();

router.get('/', getFaqsController);

export default router;
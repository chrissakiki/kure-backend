import { Router } from "express";
import faqRoutes from "./faq.routes";

const router = Router();

router.use('/faqs', faqRoutes);

export default router;
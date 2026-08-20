import { Router } from 'express';
import adminRoutes from './admin';
import pageRoutes from './page.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/pages', pageRoutes);
router.use('/admin', adminRoutes);

export default router;
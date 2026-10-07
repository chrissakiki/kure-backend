import { Router } from 'express';
import adminRoutes from './admin';
import pageRoutes from './page.routes';
import authRoutes from './auth.routes';
import bookingRoutes from './booking.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/pages', pageRoutes);
router.use('/booking', bookingRoutes);
router.use('/admin', adminRoutes);

export default router;
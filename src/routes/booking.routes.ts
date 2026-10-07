import { Router } from 'express';
import { getBookingOptions } from '../controllers/booking.controller';
import { validate } from '../middleware/validate.middleware';
import { getBookingOptionsSchema } from '../schemas/booking.schema';

const router = Router();

router.get('/options', validate(getBookingOptionsSchema), getBookingOptions);

export default router;

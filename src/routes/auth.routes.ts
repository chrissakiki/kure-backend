import { Router } from 'express';
import { login, logout, register, verifyOtp } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  loginSchema,
  registerSchema,
  verifyOtpSchema,
} from '../schemas/auth.schema';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);
router.post('/login', validate(loginSchema), login);
router.post('/logout', authMiddleware, logout);

export default router;

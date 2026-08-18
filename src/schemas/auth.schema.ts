import { z } from 'zod';

const email = z.email().transform((value) => value.toLowerCase().trim());
const password = z.string().min(8);
const otp = z.string().regex(/^\d{6}$/, 'OTP must be a 6-digit code');

export const registerSchema = z.object({
  body: z.object({
    email,
    password,
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  }),
});

export const verifyOtpSchema = z.object({
  body: z.object({
    email,
    otp,
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email,
    password,
  }),
});

import { Request, Response } from 'express';
import { prisma } from '../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OtpPurpose } from '../generated/prisma/enums';
import { randomInt } from 'crypto';
import { sendMail } from '../utils/mail';

 const login = async (req: Request, res: Response) => {
  const email = (req.body.email as string).toLowerCase().trim();
  const { password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        tokenVersion: true,
        role: true,
        isActive: true,
        emailVerifiedAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: { message: 'Invalid credentials', code: 'INVALID_CREDENTIALS' },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: { message: 'Invalid credentials', code: 'INVALID_CREDENTIALS' },
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        error: { message: 'Account is disabled', code: 'ACCOUNT_DISABLED' },
      });
    }

    if (!user.emailVerifiedAt) {
      return res.status(403).json({
        error: { message: 'Email is not verified', code: 'EMAIL_NOT_VERIFIED' },
      });
    }

    const token = jwt.sign(
      { id: user.id, tokenVersion: user.tokenVersion },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '1h' }, // 1 hour
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return res.status(200).json({
      data: {
        token,
        user: { id: user.id, email: user.email, role: user.role },
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

 const register = async (req: Request, res: Response) => {
  const { password, firstName, lastName } = req.body;
  const email = (req.body.email as string).toLowerCase().trim();

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, emailVerifiedAt: true },
    });

    if (existingUser?.emailVerifiedAt) {
      return res.status(409).json({
        error: {
          message: 'Email already in use',
          code: 'EMAIL_ALREADY_EXISTS',
        },
      });
    }

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email,
          passwordHash: await bcrypt.hash(password, 12),
          firstName,
          lastName,
          role: 'USER',
        },
      });
    }

    await prisma.otpChallenge.updateMany({
      where: {
        email,
        purpose: OtpPurpose.EMAIL_VERIFICATION,
        consumedAt: null,
      },
      data: { consumedAt: new Date() },
    });

    const code = String(randomInt(100000, 1000000));

    await prisma.otpChallenge.create({
      data: {
        email,
        codeHash: await bcrypt.hash(code, 12),
        purpose: OtpPurpose.EMAIL_VERIFICATION,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes,
      },
    });

    await sendMail({
      to: email,
      subject: 'Your KURE verification code',
      text: `Your verification code is ${code}. It expires in 10 minutes.`,
    });

    return res.status(201).json({
      data: { message: 'Verification code sent' },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

 const verifyOtp = async (req: Request, res: Response) => {
  const email = (req.body.email as string).toLowerCase().trim();
  const { otp } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        tokenVersion: true,
        emailVerifiedAt: true,
      },
    });

    if (!user) {
      return res.status(400).json({
        error: { message: 'Invalid or expired code', code: 'INVALID_OTP' },
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        error: { message: 'Account is disabled', code: 'ACCOUNT_DISABLED' },
      });
    }

    const challenge = await prisma.otpChallenge.findFirst({
      where: {
        email,
        purpose: OtpPurpose.EMAIL_VERIFICATION,
        consumedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!challenge || !(await bcrypt.compare(otp, challenge.codeHash))) {
      return res.status(400).json({
        error: { message: 'Invalid or expired code', code: 'INVALID_OTP' },
      });
    }

    await prisma.$transaction([
      prisma.otpChallenge.update({
        where: { id: challenge.id },
        data: { consumedAt: new Date() },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { emailVerifiedAt: user.emailVerifiedAt ?? new Date() },
      }),
    ]);

    const token = jwt.sign(
      { id: user.id, tokenVersion: user.tokenVersion },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '1h' },
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return res.status(200).json({
      data: {
        token,
        user: { id: user.id, email: user.email, role: user.role },
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

 const logout = async (req: Request, res: Response) => {
  try {
    await prisma.user.update({
      where: { id: req.user!.id },
      data: { tokenVersion: { increment: 1 } },
    });

    return res.status(200).json({
      data: { message: 'Logged out' },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};


export { login, register, verifyOtp, logout };
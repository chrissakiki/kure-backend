import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db';

const getTokenFromRequest = (req: Request): string | null => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  return req?.cookies?.token;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        error: {
          message: 'Unauthorized',
          code: 'UNAUTHORIZED',
        },
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      id: string;
      tokenVersion: number;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        role: true,
        tokenVersion: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive || user.tokenVersion !== decoded.tokenVersion) {
      return res.status(401).json({
        error: {
          message: 'Unauthorized',
          code: 'UNAUTHORIZED',
        },
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      tokenVersion: user.tokenVersion,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        message: 'Unauthorized',
        code: 'UNAUTHORIZED',
      },
    });
  }
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({
      error: { message: 'Forbidden', code: 'FORBIDDEN' },
    });
  }
  next();
};

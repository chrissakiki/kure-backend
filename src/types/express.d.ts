import type { UserRole } from '../generated/prisma/enums';

declare global {
  namespace Express {
    interface Request {
      cookies?: {
        token?: string;
      };
      user?: {
        id: string;
        email: string;
        role: UserRole;
        tokenVersion: number;
      };
    }
  }
}

export {};
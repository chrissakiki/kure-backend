import { Request, Response } from 'express';
import { prisma } from '../config/db';

const getTestimonials = async (req: Request, res: Response) => {
  try {
    const result = await prisma.testimonialCategory.findMany({
      where: { isActive: true },
      include: {
        testimonials: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });
    res.status(200).json({
      data: result,
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

export { getTestimonials };

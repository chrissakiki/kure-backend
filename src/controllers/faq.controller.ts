import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { FaqPage } from '../generated/prisma/enums';

// GET /api/faqs — public (website)
const getFaqs = async (req: Request, res: Response) => {
  const { page } = req.query;

  try {
    const result = await prisma.faqCategory.findMany({
      where: { page: (page as FaqPage) ?? 'MAIN', isActive: true },
      include: {
        faqs: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } },
      },
      orderBy: { sortOrder: 'asc' },
    });

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

export { getFaqs };

import { Request, Response } from 'express';
import { prisma } from '../../config/db';
import { FaqPage } from '../../generated/prisma/enums';
import {
  asString,
  internalServerError,
  parseOptionalBoolean,
} from '../../utils/helpers';
import {
  buildPaginationMeta,
  getPagination,
} from '../../utils/pagination';

// GET /api/admin/faqs — flat paginated FAQ rows
const getFaqs = async (req: Request, res: Response) => {
  const faqPage = asString(req.query.faqPage) as FaqPage | undefined;
  const categoryId = asString(req.query.categoryId);
  const isActive = parseOptionalBoolean(req.query.isActive);
  const { pageNumber, limit, skip } = getPagination({
    pageNumber: req.query.pageNumber as number | undefined,
    limit: req.query.limit as number | undefined,
  });

  try {
    const where = {
      ...(categoryId ? { categoryId } : {}),
      ...(isActive === undefined ? {} : { isActive }),
      ...(faqPage ? { category: { page: faqPage } } : {}),
    };

    const [result, total] = await Promise.all([
      prisma.faq.findMany({
        where,
        include: {
          category: {
            select: { id: true, label: true, title: true, page: true },
          },
        },
        orderBy: [{ categoryId: 'asc' }, { sortOrder: 'asc' }],
        skip,
        take: limit,
      }),
      prisma.faq.count({ where }),
    ]);

    res.status(200).json({
      data: result,
      meta: buildPaginationMeta(total, pageNumber, limit),
    });
  } catch {
    internalServerError(res);
  }
};

const getFaq = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.faq.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, label: true, title: true, page: true },
        },
      },
    });

    if (!result) {
      return res.status(404).json({
        error: { message: 'FAQ not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createFaq = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const result = await prisma.faq.create({
      data: {
        question: data.question,
        answer: data.answer,
        isActive: data.isActive ?? true,
        sortOrder: data.sortOrder,
        categoryId: data.categoryId,
      },
    });
    res.status(201).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const updateFaq = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.faq.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'FAQ not found', code: 'NOT_FOUND' },
      });
    }

    const result = await prisma.faq.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteFaq = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.faq.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'FAQ not found', code: 'NOT_FOUND' },
      });
    }

    const result = await prisma.faq.delete({
      where: { id },
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getFaqCategories = async (req: Request, res: Response) => {
  const faqPage = asString(req.query.faqPage) as FaqPage | undefined;
  const includeFaqs = asString(req.query.includeFaqs) === 'true';

  try {
    const result = await prisma.faqCategory.findMany({
      where: faqPage ? { page: faqPage } : undefined,
      include: includeFaqs
        ? {
            faqs: { orderBy: { sortOrder: 'asc' } },
          }
        : undefined,
      orderBy: { sortOrder: 'asc' },
    });
    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getFaqCategory = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const includeFaqs = asString(req.query.includeFaqs) === 'true';

  try {
    const result = await prisma.faqCategory.findUnique({
      where: { id },
      include: includeFaqs
        ? {
            faqs: { orderBy: { sortOrder: 'asc' } },
          }
        : undefined,
    });

    if (!result) {
      return res.status(404).json({
        error: { message: 'FAQ category not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createFaqCategory = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const result = await prisma.faqCategory.create({
      data: {
        page: data.page,
        label: data.label,
        title: data.title,
        isActive: data.isActive ?? true,
        sortOrder: data.sortOrder,
      },
    });
    res.status(201).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const updateFaqCategory = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.faqCategory.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'FAQ category not found', code: 'NOT_FOUND' },
      });
    }

    const result = await prisma.faqCategory.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteFaqCategory = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.faqCategory.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'FAQ category not found', code: 'NOT_FOUND' },
      });
    }

    const result = await prisma.faqCategory.delete({
      where: { id },
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

export {
  getFaqs,
  getFaq,
  createFaq,
  updateFaq,
  deleteFaq,
  getFaqCategories,
  getFaqCategory,
  createFaqCategory,
  updateFaqCategory,
  deleteFaqCategory,
};

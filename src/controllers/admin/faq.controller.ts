import { Request, Response } from 'express';
import { prisma } from '../../config/db';
import { FaqPage } from '../../generated/prisma/enums';

// GET /api/admin/faqs — CMS (all categories + faqs, optional ?page=)
const getFaqs = async (req: Request, res: Response) => {
  const { page } = req.query;

  try {
    const result = await prisma.faqCategory.findMany({
      where: page ? { page: page as FaqPage } : undefined,
      include: {
        faqs: { orderBy: { sortOrder: 'asc' } },
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

const getFaq = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await prisma.faq.findUnique({
      where: { id: id as string },
    });

    if (!result) {
      return res.status(404).json({
        error: { message: 'FAQ not found', code: 'NOT_FOUND' },
      });
    }

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
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

const updateFaq = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await prisma.faq.update({
      where: { id: id as string },
      data: req.body,
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

const deleteFaq = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await prisma.faq.delete({
      where: { id: id as string },
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

const getFaqCategories = async (req: Request, res: Response) => {
  const { page } = req.query;

  try {
    const result = await prisma.faqCategory.findMany({
      where: page ? { page: page as FaqPage } : undefined,
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

const getFaqCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await prisma.faqCategory.findUnique({
      where: { id: id as string },
    });

    if (!result) {
      return res.status(404).json({
        error: { message: 'FAQ category not found', code: 'NOT_FOUND' },
      });
    }
 
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
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

const updateFaqCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await prisma.faqCategory.update({
      where: { id: id as string },
      data: req.body,
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

const deleteFaqCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await prisma.faqCategory.delete({
      where: { id: id as string },
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

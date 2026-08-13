import { Request, Response } from 'express';
import { prisma } from '../config/db';

const getFaqs = async (req: Request, res: Response) => {
  try {
    const faqs = await prisma.faqCategory.findMany({
      where: { page: 'MAIN', isActive: true },
      include: {
        faqs: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } },
      },
      orderBy: { sortOrder: 'asc' },
    });

    res.status(200).json({ data: faqs });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

// CMS
const getFaq = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const faq = await prisma.faq.findUnique({
      where: { id: id as string },
    });

    if (!faq) {
      return res.status(404).json({
        error: { message: 'FAQ not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: faq });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

// CMS
const getFaqCategories = async (req: Request, res: Response) => {
  try {
    const faqCategories = await prisma.faqCategory.findMany({
      where: { page: 'MAIN', isActive: true },
    });
    res.status(200).json({ data: faqCategories });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

// CMS
const getFaqCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const faqCategory = await prisma.faqCategory.findUnique({
      where: { id: id as string },
    });

    if (!faqCategory) {
      return res.status(404).json({
        error: { message: 'FAQ category not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: faqCategory });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

// CMS

const createFaqCategory = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const faqCategory = await prisma.faqCategory.create({
      data: {
        page: data.page,
        label: data.label,
        title: data.title,
        isActive: data.isActive ?? true,
        sortOrder: data.sortOrder,
      },
    });
    res.status(201).json({ data: faqCategory });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

export { createFaqCategory, getFaqs, getFaq, getFaqCategories, getFaqCategory };

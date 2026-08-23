import { prisma } from '../../config/db';
import { Request, Response } from 'express';
import { asString } from '../../utils/helpers';
import {
  buildPaginationMeta,
  getPagination,
} from '../../utils/pagination';

const internalServerError = (res: Response) =>
  res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR',
    },
  });

const parseOptionalBoolean = (value: unknown) => {
  const raw = asString(value);
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  return undefined;
};

// GET /api/admin/testimonials — flat paginated rows
const getTestimonials = async (req: Request, res: Response) => {
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
    };

    const [result, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        include: {
          category: {
            select: { id: true, label: true, title: true },
          },
        },
        orderBy: [{ categoryId: 'asc' }, { sortOrder: 'asc' }],
        skip,
        take: limit,
      }),
      prisma.testimonial.count({ where }),
    ]);

    res.status(200).json({
      data: result,
      meta: buildPaginationMeta(total, pageNumber, limit),
    });
  } catch {
    internalServerError(res);
  }
};

const getTestimonial = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.testimonial.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, label: true, title: true },
        },
      },
    });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Testimonial not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createTestimonial = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const result = await prisma.testimonial.create({
      data: {
        name: data.name,
        content: data.content,
        subtitle: data.subtitle,
        categoryId: data.categoryId,
        sortOrder: data.sortOrder,
        isActive: data.isActive ?? true,
      },
    });

    res.status(201).json({
      data: result,
    });
  } catch {
    internalServerError(res);
  }
};

const updateTestimonial = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  try {
    const existing = await prisma.testimonial.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Testimonial not found', code: 'NOT_FOUND' },
      });
    }

    const result = await prisma.testimonial.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteTestimonial = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  try {
    const existing = await prisma.testimonial.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Testimonial not found', code: 'NOT_FOUND' },
      });
    }

    const result = await prisma.testimonial.delete({
      where: { id },
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getTestimonialCategories = async (req: Request, res: Response) => {
  const includeTestimonials =
    asString(req.query.includeTestimonials) === 'true';

  try {
    const result = await prisma.testimonialCategory.findMany({
      include: includeTestimonials
        ? {
            testimonials: { orderBy: { sortOrder: 'asc' } },
          }
        : undefined,
      orderBy: { sortOrder: 'asc' },
    });
    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getTestimonialCategory = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const includeTestimonials =
    asString(req.query.includeTestimonials) === 'true';

  try {
    const result = await prisma.testimonialCategory.findUnique({
      where: { id },
      include: includeTestimonials
        ? {
            testimonials: { orderBy: { sortOrder: 'asc' } },
          }
        : undefined,
    });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Testimonial category not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createTestimonialCategory = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const result = await prisma.testimonialCategory.create({
      data: {
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

const updateTestimonialCategory = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.testimonialCategory.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Testimonial category not found', code: 'NOT_FOUND' },
      });
    }

    const result = await prisma.testimonialCategory.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteTestimonialCategory = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.testimonialCategory.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Testimonial category not found', code: 'NOT_FOUND' },
      });
    }

    const result = await prisma.testimonialCategory.delete({
      where: { id },
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

export {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonialCategories,
  getTestimonialCategory,
  createTestimonialCategory,
  updateTestimonialCategory,
  deleteTestimonialCategory,
};

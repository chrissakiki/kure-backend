import { prisma } from '../../config/db';
import { Request, Response } from 'express';

const getTestimonials = async (req: Request, res: Response) => {
  try {
    const result = await prisma.testimonialCategory.findMany({
      include: {
        testimonials: {
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

const getTestimonial = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await prisma.testimonial.findUnique({
      where: { id: id as string },
    });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Testimonial not found', code: 'NOT_FOUND' },
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
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

const updateTestimonial = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await prisma.testimonial.update({
      where: { id: id as string },
      data: req.body,
    });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Testimonial not found', code: 'NOT_FOUND' },
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

const deleteTestimonial = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await prisma.testimonial.delete({
      where: { id: id as string },
    });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Testimonial not found', code: 'NOT_FOUND' },
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

const getTestimonialCategories = async (req: Request, res: Response) => {
  try {
    const result = await prisma.testimonialCategory.findMany({
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

const getTestimonialCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await prisma.testimonialCategory.findUnique({
      where: { id: id as string },
    });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Testimonial category not found', code: 'NOT_FOUND' },
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
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

const updateTestimonialCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await prisma.testimonialCategory.update({
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

const deleteTestimonialCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await prisma.testimonialCategory.delete({
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

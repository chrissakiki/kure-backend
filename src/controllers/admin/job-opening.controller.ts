import { Request, Response } from 'express';
import { prisma } from '../../config/db';
import { JobOpeningStatus } from '../../generated/prisma/enums';
import { asString } from '../../utils/helpers';

const internalServerError = (res: Response) =>
  res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR',
    },
  });

const getJobOpenings = async (req: Request, res: Response) => {
  const status = asString(req.query.status) as JobOpeningStatus | undefined;

  try {
    const result = await prisma.jobOpening.findMany({
      where: status ? { status } : undefined,
      orderBy: { sortOrder: 'asc' },
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getJobOpening = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.jobOpening.findUnique({ where: { id } });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Job opening not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createJobOpening = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const existing = await prisma.jobOpening.findFirst({
      where: { sortOrder: data.sortOrder },
    });

    if (existing) {
      return res.status(409).json({
        error: {
          message: 'Job opening sort order is already used',
          code: 'SORT_ORDER_TAKEN',
        },
      });
    }

    const result = await prisma.jobOpening.create({
      data: {
        ...data,
        isActive: data.isActive ?? true,
      },
    });

    res.status(201).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const updateJobOpening = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const data = req.body;

  try {
    const existing = await prisma.jobOpening.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Job opening not found', code: 'NOT_FOUND' },
      });
    }

    if (data.sortOrder !== undefined) {
      const duplicate = await prisma.jobOpening.findFirst({
        where: {
          sortOrder: data.sortOrder,
          id: { not: id },
        },
      });

      if (duplicate) {
        return res.status(409).json({
          error: {
            message: 'Job opening sort order is already used',
            code: 'SORT_ORDER_TAKEN',
          },
        });
      }
    }

    const result = await prisma.jobOpening.update({
      where: { id },
      data,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteJobOpening = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.jobOpening.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Job opening not found', code: 'NOT_FOUND' },
      });
    }

    await prisma.jobOpening.delete({ where: { id } });

    res.status(200).json({ data: { id } });
  } catch {
    internalServerError(res);
  }
};

export {
  getJobOpenings,
  getJobOpening,
  createJobOpening,
  updateJobOpening,
  deleteJobOpening,
};

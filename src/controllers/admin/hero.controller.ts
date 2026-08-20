import { Request, Response } from 'express';
import { prisma } from '../../config/db';
import { SitePage } from '../../generated/prisma/enums';
import { asString } from '../../utils/helpers';

const getHeroes = async (req: Request, res: Response) => {
  const page = asString(req.query.page) as SitePage | undefined;

  try {
    const result = await prisma.hero.findMany({
      where: page ? { page } : undefined,
      orderBy: { createdAt: 'asc' },
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

const getHero = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.hero.findUnique({
      where: { id },
    });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Hero not found', code: 'NOT_FOUND' },
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

const createHero = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const existing = await prisma.hero.findUnique({
      where: { page: data.page },
    });

    if (existing) {
      return res.status(409).json({
        error: { message: 'Hero for this page already exists', code: 'HERO_EXISTS' },
      });
    }

    const result = await prisma.hero.create({
      data: {
        page: data.page,
        eyebrow: data.eyebrow,
        title: data.title,
        titleAccent: data.titleAccent,
        tagline: data.tagline,
        description: data.description,
        notice: data.notice,
        imageUrl: data.imageUrl,
        primaryCtaLabel: data.primaryCtaLabel,
        primaryCtaHref: data.primaryCtaHref,
        secondaryCtaLabel: data.secondaryCtaLabel,
        secondaryCtaHref: data.secondaryCtaHref,
        highlights: data.highlights,
        isActive: data.isActive ?? true,
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

const updateHero = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const data = req.body;

  try {
    const existing = await prisma.hero.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Hero not found', code: 'NOT_FOUND' },
      });
    }

    if (data.page && data.page !== existing.page) {
      const pageTaken = await prisma.hero.findUnique({
        where: { page: data.page },
      });

      if (pageTaken) {
        return res.status(409).json({
          error: { message: 'Hero for this page already exists', code: 'HERO_EXISTS' },
        });
      }
    }

    const result = await prisma.hero.update({
      where: { id },
      data,
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

const deleteHero = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.hero.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Hero not found', code: 'NOT_FOUND' },
      });
    }

    const result = await prisma.hero.delete({
      where: { id },
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

export { getHeroes, getHero, createHero, updateHero, deleteHero };

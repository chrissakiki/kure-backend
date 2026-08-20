import { Request, Response } from 'express';
import { prisma } from '../../config/db';
import { SitePage } from '../../generated/prisma/enums';
import { asString } from '../../utils/helpers';

const internalServerError = (res: Response) =>
  res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR',
    },
  });

const getSectionIntros = async (req: Request, res: Response) => {
  const page = asString(req.query.page) as SitePage | undefined;
  const sectionKey = asString(req.query.sectionKey);

  try {
    const result = await prisma.sectionIntro.findMany({
      where: {
        page,
        sectionKey,
      },
      orderBy: [{ page: 'asc' }, { sectionKey: 'asc' }, { createdAt: 'asc' }],
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getSectionIntro = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.sectionIntro.findUnique({
      where: { id },
    });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Section intro not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createSectionIntro = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const existing = await prisma.sectionIntro.findFirst({
      where: { page: data.page, sectionKey: data.sectionKey },
    });

    if (existing) {
      return res.status(409).json({
        error: {
          message: 'Section intro for this page and key already exists',
          code: 'SECTION_INTRO_EXISTS',
        },
      });
    }

    const result = await prisma.sectionIntro.create({
      data: {
        page: data.page,
        sectionKey: data.sectionKey,
        eyebrow: data.eyebrow,
        title: data.title,
        titleAccent: data.titleAccent,
        description: data.description,
        isActive: data.isActive ?? true,
      },
    });

    res.status(201).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const updateSectionIntro = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const data = req.body;

  try {
    const existing = await prisma.sectionIntro.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Section intro not found', code: 'NOT_FOUND' },
      });
    }

    const nextPage = data.page ?? existing.page;
    const nextSectionKey = data.sectionKey ?? existing.sectionKey;

    const duplicate = await prisma.sectionIntro.findFirst({
      where: {
        page: nextPage,
        sectionKey: nextSectionKey,
        id: { not: id },
      },
    });

    if (duplicate) {
      return res.status(409).json({
        error: {
          message: 'Section intro for this page and key already exists',
          code: 'SECTION_INTRO_EXISTS',
        },
      });
    }

    const result = await prisma.sectionIntro.update({
      where: { id },
      data,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteSectionIntro = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.sectionIntro.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Section intro not found', code: 'NOT_FOUND' },
      });
    }

    const result = await prisma.sectionIntro.delete({ where: { id } });
    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getOfferCards = async (req: Request, res: Response) => {
  const page = asString(req.query.page) as SitePage | undefined;
  const sectionKey = asString(req.query.sectionKey);

  try {
    const result = await prisma.offerCard.findMany({
      where: {
        page,
        sectionKey,
      },
      orderBy: [{ page: 'asc' }, { sectionKey: 'asc' }, { sortOrder: 'asc' }],
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getOfferCard = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.offerCard.findUnique({ where: { id } });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Offer card not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createOfferCard = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const existing = await prisma.offerCard.findFirst({
      where: {
        page: data.page,
        sectionKey: data.sectionKey,
        sortOrder: data.sortOrder,
      },
    });

    if (existing) {
      return res.status(409).json({
        error: {
          message: 'Offer card sort order is already used in this section',
          code: 'SORT_ORDER_TAKEN',
        },
      });
    }

    const result = await prisma.offerCard.create({
      data: {
        ...data,
        perks: data.perks ?? [],
        isActive: data.isActive ?? true,
      },
    });

    res.status(201).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const updateOfferCard = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const data = req.body;

  try {
    const existing = await prisma.offerCard.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Offer card not found', code: 'NOT_FOUND' },
      });
    }

    const duplicate = await prisma.offerCard.findFirst({
      where: {
        page: data.page ?? existing.page,
        sectionKey: data.sectionKey ?? existing.sectionKey,
        sortOrder: data.sortOrder ?? existing.sortOrder,
        id: { not: id },
      },
    });

    if (duplicate) {
      return res.status(409).json({
        error: {
          message: 'Offer card sort order is already used in this section',
          code: 'SORT_ORDER_TAKEN',
        },
      });
    }

    const result = await prisma.offerCard.update({
      where: { id },
      data,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteOfferCard = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.offerCard.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Offer card not found', code: 'NOT_FOUND' },
      });
    }

    const result = await prisma.offerCard.delete({ where: { id } });
    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getFeatureItems = async (req: Request, res: Response) => {
  const page = asString(req.query.page) as SitePage | undefined;
  const sectionKey = asString(req.query.sectionKey);

  try {
    const result = await prisma.featureItem.findMany({
      where: {
        page,
        sectionKey,
      },
      orderBy: [{ page: 'asc' }, { sectionKey: 'asc' }, { sortOrder: 'asc' }],
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getFeatureItem = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.featureItem.findUnique({ where: { id } });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Feature item not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createFeatureItem = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const existing = await prisma.featureItem.findFirst({
      where: {
        page: data.page,
        sectionKey: data.sectionKey,
        sortOrder: data.sortOrder,
      },
    });

    if (existing) {
      return res.status(409).json({
        error: {
          message: 'Feature item sort order is already used in this section',
          code: 'SORT_ORDER_TAKEN',
        },
      });
    }

    const result = await prisma.featureItem.create({
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

const updateFeatureItem = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const data = req.body;

  try {
    const existing = await prisma.featureItem.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Feature item not found', code: 'NOT_FOUND' },
      });
    }

    const duplicate = await prisma.featureItem.findFirst({
      where: {
        page: data.page ?? existing.page,
        sectionKey: data.sectionKey ?? existing.sectionKey,
        sortOrder: data.sortOrder ?? existing.sortOrder,
        id: { not: id },
      },
    });

    if (duplicate) {
      return res.status(409).json({
        error: {
          message: 'Feature item sort order is already used in this section',
          code: 'SORT_ORDER_TAKEN',
        },
      });
    }

    const result = await prisma.featureItem.update({
      where: { id },
      data,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteFeatureItem = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.featureItem.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Feature item not found', code: 'NOT_FOUND' },
      });
    }

    const result = await prisma.featureItem.delete({ where: { id } });
    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getStepItems = async (req: Request, res: Response) => {
  const page = asString(req.query.page) as SitePage | undefined;
  const sectionKey = asString(req.query.sectionKey);

  try {
    const result = await prisma.stepItem.findMany({
      where: {
        page,
        sectionKey,
      },
      orderBy: [{ page: 'asc' }, { sectionKey: 'asc' }, { sortOrder: 'asc' }],
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getStepItem = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.stepItem.findUnique({ where: { id } });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Step item not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createStepItem = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const existing = await prisma.stepItem.findFirst({
      where: {
        page: data.page,
        sectionKey: data.sectionKey,
        sortOrder: data.sortOrder,
      },
    });

    if (existing) {
      return res.status(409).json({
        error: {
          message: 'Step item sort order is already used in this section',
          code: 'SORT_ORDER_TAKEN',
        },
      });
    }

    const result = await prisma.stepItem.create({
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

const updateStepItem = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const data = req.body;

  try {
    const existing = await prisma.stepItem.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Step item not found', code: 'NOT_FOUND' },
      });
    }

    const duplicate = await prisma.stepItem.findFirst({
      where: {
        page: data.page ?? existing.page,
        sectionKey: data.sectionKey ?? existing.sectionKey,
        sortOrder: data.sortOrder ?? existing.sortOrder,
        id: { not: id },
      },
    });

    if (duplicate) {
      return res.status(409).json({
        error: {
          message: 'Step item sort order is already used in this section',
          code: 'SORT_ORDER_TAKEN',
        },
      });
    }

    const result = await prisma.stepItem.update({
      where: { id },
      data,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteStepItem = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.stepItem.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Step item not found', code: 'NOT_FOUND' },
      });
    }

    const result = await prisma.stepItem.delete({ where: { id } });
    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getSectionOutros = async (req: Request, res: Response) => {
  const page = asString(req.query.page) as SitePage | undefined;

  try {
    const result = await prisma.sectionOutro.findMany({
      where: page ? { page } : undefined,
      orderBy: { page: 'asc' },
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getSectionOutro = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.sectionOutro.findUnique({ where: { id } });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Section outro not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const updateSectionOutro = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const data = req.body;

  try {
    const existing = await prisma.sectionOutro.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Section outro not found', code: 'NOT_FOUND' },
      });
    }

    if (data.page && data.page !== existing.page) {
      const pageTaken = await prisma.sectionOutro.findUnique({
        where: { page: data.page },
      });

      if (pageTaken) {
        return res.status(409).json({
          error: {
            message: 'Section outro for this page already exists',
            code: 'SECTION_OUTRO_EXISTS',
          },
        });
      }
    }

    const result = await prisma.sectionOutro.update({
      where: { id },
      data,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getLegalDocuments = async (req: Request, res: Response) => {
  const page = asString(req.query.page) as SitePage | undefined;

  try {
    const result = await prisma.legalDocument.findMany({
      where: page ? { page } : undefined,
      orderBy: { page: 'asc' },
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getLegalDocument = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.legalDocument.findUnique({ where: { id } });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Legal document not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const updateLegalDocument = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const { content } = req.body;

  try {
    const existing = await prisma.legalDocument.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Legal document not found', code: 'NOT_FOUND' },
      });
    }

    const result = await prisma.legalDocument.update({
      where: { id },
      data: { content },
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getContentBlocks = async (req: Request, res: Response) => {
  const page = asString(req.query.page) as SitePage | undefined;
  const sectionKey = asString(req.query.sectionKey);

  try {
    const result = await prisma.contentBlock.findMany({
      where: {
        page,
        sectionKey,
      },
      orderBy: [{ page: 'asc' }, { sectionKey: 'asc' }, { createdAt: 'asc' }],
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getContentBlock = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.contentBlock.findUnique({ where: { id } });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Content block not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createContentBlock = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const existing = await prisma.contentBlock.findFirst({
      where: { page: data.page, sectionKey: data.sectionKey },
    });

    if (existing) {
      return res.status(409).json({
        error: {
          message: 'Content block for this page and key already exists',
          code: 'CONTENT_BLOCK_EXISTS',
        },
      });
    }

    const result = await prisma.contentBlock.create({
      data: {
        page: data.page,
        sectionKey: data.sectionKey,
        content: data.content,
        isActive: data.isActive ?? true,
      },
    });

    res.status(201).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const updateContentBlock = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const data = req.body;

  try {
    const existing = await prisma.contentBlock.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Content block not found', code: 'NOT_FOUND' },
      });
    }

    const nextPage = data.page ?? existing.page;
    const nextSectionKey = data.sectionKey ?? existing.sectionKey;

    const duplicate = await prisma.contentBlock.findFirst({
      where: {
        page: nextPage,
        sectionKey: nextSectionKey,
        id: { not: id },
      },
    });

    if (duplicate) {
      return res.status(409).json({
        error: {
          message: 'Content block for this page and key already exists',
          code: 'CONTENT_BLOCK_EXISTS',
        },
      });
    }

    const result = await prisma.contentBlock.update({
      where: { id },
      data,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteContentBlock = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.contentBlock.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Content block not found', code: 'NOT_FOUND' },
      });
    }

    await prisma.contentBlock.delete({ where: { id } });

    res.status(200).json({ data: { id } });
  } catch {
    internalServerError(res);
  }
};

const getMilestoneStats = async (req: Request, res: Response) => {
  const page = asString(req.query.page) as SitePage | undefined;
  const sectionKey = asString(req.query.sectionKey);

  try {
    const result = await prisma.milestoneStat.findMany({
      where: {
        page,
        sectionKey,
      },
      orderBy: [{ page: 'asc' }, { sectionKey: 'asc' }, { sortOrder: 'asc' }],
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getMilestoneStat = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.milestoneStat.findUnique({ where: { id } });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Milestone stat not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createMilestoneStat = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const existing = await prisma.milestoneStat.findFirst({
      where: {
        page: data.page,
        sectionKey: data.sectionKey,
        sortOrder: data.sortOrder,
      },
    });

    if (existing) {
      return res.status(409).json({
        error: {
          message: 'Milestone sort order is already used in this section',
          code: 'SORT_ORDER_TAKEN',
        },
      });
    }

    const result = await prisma.milestoneStat.create({
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

const updateMilestoneStat = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const data = req.body;

  try {
    const existing = await prisma.milestoneStat.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Milestone stat not found', code: 'NOT_FOUND' },
      });
    }

    const duplicate = await prisma.milestoneStat.findFirst({
      where: {
        page: data.page ?? existing.page,
        sectionKey: data.sectionKey ?? existing.sectionKey,
        sortOrder: data.sortOrder ?? existing.sortOrder,
        id: { not: id },
      },
    });

    if (duplicate) {
      return res.status(409).json({
        error: {
          message: 'Milestone sort order is already used in this section',
          code: 'SORT_ORDER_TAKEN',
        },
      });
    }

    const result = await prisma.milestoneStat.update({
      where: { id },
      data,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteMilestoneStat = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.milestoneStat.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Milestone stat not found', code: 'NOT_FOUND' },
      });
    }

    await prisma.milestoneStat.delete({ where: { id } });

    res.status(200).json({ data: { id } });
  } catch {
    internalServerError(res);
  }
};

export {
  getSectionIntros,
  getSectionIntro,
  createSectionIntro,
  updateSectionIntro,
  deleteSectionIntro,
  getSectionOutros,
  getSectionOutro,
  updateSectionOutro,
  getOfferCards,
  getOfferCard,
  createOfferCard,
  updateOfferCard,
  deleteOfferCard,
  getFeatureItems,
  getFeatureItem,
  createFeatureItem,
  updateFeatureItem,
  deleteFeatureItem,
  getStepItems,
  getStepItem,
  createStepItem,
  updateStepItem,
  deleteStepItem,
  getLegalDocuments,
  getLegalDocument,
  updateLegalDocument,
  getContentBlocks,
  getContentBlock,
  createContentBlock,
  updateContentBlock,
  deleteContentBlock,
  getMilestoneStats,
  getMilestoneStat,
  createMilestoneStat,
  updateMilestoneStat,
  deleteMilestoneStat,
};

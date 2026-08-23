import { Request, Response } from 'express';
import { prisma } from '../../config/db';
import { CategoryPriceKind } from '../../generated/prisma/enums';
import {
  asString,
  internalServerError,
  parseOptionalBoolean,
} from '../../utils/helpers';
import {
  buildPaginationMeta,
  getPagination,
} from '../../utils/pagination';

// -- Currency --

const getCurrencies = async (req: Request, res: Response) => {
  const isActive = parseOptionalBoolean(req.query.isActive);

  try {
    const result = await prisma.currency.findMany({
      where: isActive === undefined ? undefined : { isActive },
      orderBy: { code: 'asc' },
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getCurrency = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.currency.findUnique({ where: { id } });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Currency not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createCurrency = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const existing = await prisma.currency.findUnique({
      where: { code: data.code },
    });

    if (existing) {
      return res.status(409).json({
        error: {
          message: 'Currency code already exists',
          code: 'CURRENCY_CODE_EXISTS',
        },
      });
    }

    const result = await prisma.currency.create({
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

const updateCurrency = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const data = req.body;

  try {
    const existing = await prisma.currency.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Currency not found', code: 'NOT_FOUND' },
      });
    }

    if (data.code !== undefined) {
      const duplicate = await prisma.currency.findFirst({
        where: { code: data.code, id: { not: id } },
      });

      if (duplicate) {
        return res.status(409).json({
          error: {
            message: 'Currency code already exists',
            code: 'CURRENCY_CODE_EXISTS',
          },
        });
      }
    }

    const result = await prisma.currency.update({
      where: { id },
      data,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteCurrency = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.currency.findUnique({
      where: { id },
      include: { _count: { select: { categories: true } } },
    });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Currency not found', code: 'NOT_FOUND' },
      });
    }

    if (existing._count.categories > 0) {
      return res.status(409).json({
        error: {
          message: 'Currency is used by service categories',
          code: 'CURRENCY_IN_USE',
        },
      });
    }

    await prisma.currency.delete({ where: { id } });

    res.status(200).json({ data: { id } });
  } catch {
    internalServerError(res);
  }
};

// -- Service category --

const getServiceCategories = async (req: Request, res: Response) => {
  const isActive = parseOptionalBoolean(req.query.isActive);

  try {
    const result = await prisma.serviceCategory.findMany({
      where: isActive === undefined ? undefined : { isActive },
      include: { currency: true },
      orderBy: { sortOrder: 'asc' },
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const getServiceCategory = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.serviceCategory.findUnique({
      where: { id },
      include: {
        currency: true,
        services: { orderBy: { sortOrder: 'asc' } },
        prices: { orderBy: { sortOrder: 'asc' } },
        addons: { orderBy: { sortOrder: 'asc' } },
      },
    });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Service category not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createServiceCategory = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const currency = await prisma.currency.findUnique({
      where: { id: data.currencyId },
    });

    if (!currency) {
      return res.status(404).json({
        error: { message: 'Currency not found', code: 'CURRENCY_NOT_FOUND' },
      });
    }

    const slugTaken = await prisma.serviceCategory.findUnique({
      where: { slug: data.slug },
    });

    if (slugTaken) {
      return res.status(409).json({
        error: {
          message: 'Service category slug already exists',
          code: 'SLUG_EXISTS',
        },
      });
    }

    const sortTaken = await prisma.serviceCategory.findFirst({
      where: { sortOrder: data.sortOrder },
    });

    if (sortTaken) {
      return res.status(409).json({
        error: {
          message: 'Service category sort order is already used',
          code: 'SORT_ORDER_TAKEN',
        },
      });
    }

    const result = await prisma.serviceCategory.create({
      data: {
        ...data,
        highlights: data.highlights ?? [],
        isActive: data.isActive ?? true,
      },
      include: { currency: true },
    });

    res.status(201).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const updateServiceCategory = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const data = req.body;

  try {
    const existing = await prisma.serviceCategory.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Service category not found', code: 'NOT_FOUND' },
      });
    }

    if (data.currencyId !== undefined) {
      const currency = await prisma.currency.findUnique({
        where: { id: data.currencyId },
      });

      if (!currency) {
        return res.status(404).json({
          error: { message: 'Currency not found', code: 'CURRENCY_NOT_FOUND' },
        });
      }
    }

    if (data.slug !== undefined) {
      const slugTaken = await prisma.serviceCategory.findFirst({
        where: { slug: data.slug, id: { not: id } },
      });

      if (slugTaken) {
        return res.status(409).json({
          error: {
            message: 'Service category slug already exists',
            code: 'SLUG_EXISTS',
          },
        });
      }
    }

    if (data.sortOrder !== undefined) {
      const sortTaken = await prisma.serviceCategory.findFirst({
        where: { sortOrder: data.sortOrder, id: { not: id } },
      });

      if (sortTaken) {
        return res.status(409).json({
          error: {
            message: 'Service category sort order is already used',
            code: 'SORT_ORDER_TAKEN',
          },
        });
      }
    }

    const result = await prisma.serviceCategory.update({
      where: { id },
      data,
      include: { currency: true },
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteServiceCategory = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.serviceCategory.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Service category not found', code: 'NOT_FOUND' },
      });
    }

    await prisma.serviceCategory.delete({ where: { id } });

    res.status(200).json({ data: { id } });
  } catch {
    internalServerError(res);
  }
};

// -- Service --

const getServices = async (req: Request, res: Response) => {
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
      prisma.service.findMany({
        where,
        orderBy: [{ categoryId: 'asc' }, { sortOrder: 'asc' }],
        skip,
        take: limit,
      }),
      prisma.service.count({ where }),
    ]);

    res.status(200).json({
      data: result,
      meta: buildPaginationMeta(total, pageNumber, limit),
    });
  } catch {
    internalServerError(res);
  }
};

const getService = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.service.findUnique({ where: { id } });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Service not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createService = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const category = await prisma.serviceCategory.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      return res.status(404).json({
        error: {
          message: 'Service category not found',
          code: 'CATEGORY_NOT_FOUND',
        },
      });
    }

    const sortTaken = await prisma.service.findFirst({
      where: {
        categoryId: data.categoryId,
        sortOrder: data.sortOrder,
      },
    });

    if (sortTaken) {
      return res.status(409).json({
        error: {
          message: 'Service sort order is already used in this category',
          code: 'SORT_ORDER_TAKEN',
        },
      });
    }

    const result = await prisma.service.create({
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

const updateService = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const data = req.body;

  try {
    const existing = await prisma.service.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Service not found', code: 'NOT_FOUND' },
      });
    }

    const nextCategoryId = data.categoryId ?? existing.categoryId;

    if (data.categoryId !== undefined) {
      const category = await prisma.serviceCategory.findUnique({
        where: { id: data.categoryId },
      });

      if (!category) {
        return res.status(404).json({
          error: {
            message: 'Service category not found',
            code: 'CATEGORY_NOT_FOUND',
          },
        });
      }
    }

    if (data.sortOrder !== undefined || data.categoryId !== undefined) {
      const sortTaken = await prisma.service.findFirst({
        where: {
          categoryId: nextCategoryId,
          sortOrder: data.sortOrder ?? existing.sortOrder,
          id: { not: id },
        },
      });

      if (sortTaken) {
        return res.status(409).json({
          error: {
            message: 'Service sort order is already used in this category',
            code: 'SORT_ORDER_TAKEN',
          },
        });
      }
    }

    const result = await prisma.service.update({
      where: { id },
      data,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteService = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.service.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Service not found', code: 'NOT_FOUND' },
      });
    }

    await prisma.service.delete({ where: { id } });

    res.status(200).json({ data: { id } });
  } catch {
    internalServerError(res);
  }
};

// -- Category price --

const getCategoryPrices = async (req: Request, res: Response) => {
  const categoryId = asString(req.query.categoryId);
  const kind = asString(req.query.kind) as CategoryPriceKind | undefined;
  const isActive = parseOptionalBoolean(req.query.isActive);
  const { pageNumber, limit, skip } = getPagination({
    pageNumber: req.query.pageNumber as number | undefined,
    limit: req.query.limit as number | undefined,
  });

  try {
    const where = {
      ...(categoryId ? { categoryId } : {}),
      ...(kind ? { kind } : {}),
      ...(isActive === undefined ? {} : { isActive }),
    };

    const [result, total] = await Promise.all([
      prisma.categoryPrice.findMany({
        where,
        orderBy: [{ categoryId: 'asc' }, { sortOrder: 'asc' }],
        skip,
        take: limit,
      }),
      prisma.categoryPrice.count({ where }),
    ]);

    res.status(200).json({
      data: result,
      meta: buildPaginationMeta(total, pageNumber, limit),
    });
  } catch {
    internalServerError(res);
  }
};

const getCategoryPrice = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.categoryPrice.findUnique({ where: { id } });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Category price not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createCategoryPrice = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const category = await prisma.serviceCategory.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      return res.status(404).json({
        error: {
          message: 'Service category not found',
          code: 'CATEGORY_NOT_FOUND',
        },
      });
    }

    const sortTaken = await prisma.categoryPrice.findFirst({
      where: {
        categoryId: data.categoryId,
        sortOrder: data.sortOrder,
      },
    });

    if (sortTaken) {
      return res.status(409).json({
        error: {
          message: 'Price sort order is already used in this category',
          code: 'SORT_ORDER_TAKEN',
        },
      });
    }

    const result = await prisma.categoryPrice.create({
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

const updateCategoryPrice = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const data = req.body;

  try {
    const existing = await prisma.categoryPrice.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Category price not found', code: 'NOT_FOUND' },
      });
    }

    const nextCategoryId = data.categoryId ?? existing.categoryId;

    if (data.categoryId !== undefined) {
      const category = await prisma.serviceCategory.findUnique({
        where: { id: data.categoryId },
      });

      if (!category) {
        return res.status(404).json({
          error: {
            message: 'Service category not found',
            code: 'CATEGORY_NOT_FOUND',
          },
        });
      }
    }

    if (data.sortOrder !== undefined || data.categoryId !== undefined) {
      const sortTaken = await prisma.categoryPrice.findFirst({
        where: {
          categoryId: nextCategoryId,
          sortOrder: data.sortOrder ?? existing.sortOrder,
          id: { not: id },
        },
      });

      if (sortTaken) {
        return res.status(409).json({
          error: {
            message: 'Price sort order is already used in this category',
            code: 'SORT_ORDER_TAKEN',
          },
        });
      }
    }

    const result = await prisma.categoryPrice.update({
      where: { id },
      data,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteCategoryPrice = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.categoryPrice.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Category price not found', code: 'NOT_FOUND' },
      });
    }

    await prisma.categoryPrice.delete({ where: { id } });

    res.status(200).json({ data: { id } });
  } catch {
    internalServerError(res);
  }
};

// -- Category addon --

const getCategoryAddons = async (req: Request, res: Response) => {
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
      prisma.categoryAddon.findMany({
        where,
        orderBy: [{ categoryId: 'asc' }, { sortOrder: 'asc' }],
        skip,
        take: limit,
      }),
      prisma.categoryAddon.count({ where }),
    ]);

    res.status(200).json({
      data: result,
      meta: buildPaginationMeta(total, pageNumber, limit),
    });
  } catch {
    internalServerError(res);
  }
};

const getCategoryAddon = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const result = await prisma.categoryAddon.findUnique({ where: { id } });

    if (!result) {
      return res.status(404).json({
        error: { message: 'Category addon not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const createCategoryAddon = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const category = await prisma.serviceCategory.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      return res.status(404).json({
        error: {
          message: 'Service category not found',
          code: 'CATEGORY_NOT_FOUND',
        },
      });
    }

    const sortTaken = await prisma.categoryAddon.findFirst({
      where: {
        categoryId: data.categoryId,
        sortOrder: data.sortOrder,
      },
    });

    if (sortTaken) {
      return res.status(409).json({
        error: {
          message: 'Addon sort order is already used in this category',
          code: 'SORT_ORDER_TAKEN',
        },
      });
    }

    const result = await prisma.categoryAddon.create({
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

const updateCategoryAddon = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;
  const data = req.body;

  try {
    const existing = await prisma.categoryAddon.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Category addon not found', code: 'NOT_FOUND' },
      });
    }

    const nextCategoryId = data.categoryId ?? existing.categoryId;

    if (data.categoryId !== undefined) {
      const category = await prisma.serviceCategory.findUnique({
        where: { id: data.categoryId },
      });

      if (!category) {
        return res.status(404).json({
          error: {
            message: 'Service category not found',
            code: 'CATEGORY_NOT_FOUND',
          },
        });
      }
    }

    if (data.sortOrder !== undefined || data.categoryId !== undefined) {
      const sortTaken = await prisma.categoryAddon.findFirst({
        where: {
          categoryId: nextCategoryId,
          sortOrder: data.sortOrder ?? existing.sortOrder,
          id: { not: id },
        },
      });

      if (sortTaken) {
        return res.status(409).json({
          error: {
            message: 'Addon sort order is already used in this category',
            code: 'SORT_ORDER_TAKEN',
          },
        });
      }
    }

    const result = await prisma.categoryAddon.update({
      where: { id },
      data,
    });

    res.status(200).json({ data: result });
  } catch {
    internalServerError(res);
  }
};

const deleteCategoryAddon = async (req: Request, res: Response) => {
  const id = asString(req.params.id)!;

  try {
    const existing = await prisma.categoryAddon.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        error: { message: 'Category addon not found', code: 'NOT_FOUND' },
      });
    }

    await prisma.categoryAddon.delete({ where: { id } });

    res.status(200).json({ data: { id } });
  } catch {
    internalServerError(res);
  }
};

export {
  getCurrencies,
  getCurrency,
  createCurrency,
  updateCurrency,
  deleteCurrency,
  getServiceCategories,
  getServiceCategory,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  getCategoryPrices,
  getCategoryPrice,
  createCategoryPrice,
  updateCategoryPrice,
  deleteCategoryPrice,
  getCategoryAddons,
  getCategoryAddon,
  createCategoryAddon,
  updateCategoryAddon,
  deleteCategoryAddon,
};

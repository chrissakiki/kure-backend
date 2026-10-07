import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { CategoryPriceKind, SitePage } from '../generated/prisma/enums';
import { internalServerError } from '../utils/helpers';

const getBookingOptions = async (_req: Request, res: Response) => {
  try {
    const [houses, coverageAreas, categories] = await Promise.all([
      prisma.offerCard.findMany({
        where: {
          page: SitePage.LOCATIONS,
          sectionKey: 'LOCATION_HOUSES',
          isActive: true,
        },
        orderBy: { sortOrder: 'asc' },
        select: {
          id: true,
          name: true,
          sortOrder: true,
        },
      }),
      prisma.featureItem.findMany({
        where: {
          page: SitePage.LOCATIONS,
          sectionKey: 'LOCATION_COVERAGE',
          isActive: true,
        },
        orderBy: { sortOrder: 'asc' },
        select: {
          id: true,
          title: true,
          sortOrder: true,
        },
      }),
      prisma.serviceCategory.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        select: {
          id: true,
          name: true,
          slug: true,
          sortOrder: true,
          services: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            select: {
              id: true,
              name: true,
              sortOrder: true,
            },
          },
          prices: {
            where: {
              isActive: true,
              kind: CategoryPriceKind.SINGLE,
            },
            orderBy: { sortOrder: 'asc' },
            select: {
              id: true,
              label: true,
              price: true,
              sortOrder: true,
            },
          },
          addons: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              sortOrder: true,
            },
          },
        },
      }),
    ]);

    const locations = [
      ...houses.map((house) => ({
        id: house.id,
        name: house.name,
        type: 'HOUSE' as const,
        sortOrder: house.sortOrder,
      })),
      ...coverageAreas.map((area) => ({
        id: area.id,
        name: `${area.title} - In-Home Service`,
        type: 'IN_HOME' as const,
        sortOrder: area.sortOrder + houses.length,
      })),
    ];

    const services = categories.flatMap((category) => {
      const durations = category.prices.map((price) => price.label);
      const defaultDuration = durations[0] ?? null;

      return category.services.map((service) => ({
        id: service.id,
        name: service.name,
        categoryId: category.id,
        categoryName: category.name,
        categorySlug: category.slug,
        durations,
        defaultDuration,
        sortOrder: category.sortOrder * 100 + service.sortOrder,
      }));
    });

    const addons = categories.flatMap((category) =>
      category.addons.map((addon) => ({
        id: addon.id,
        name: addon.name,
        description: addon.description,
        price: addon.price,
        categoryId: category.id,
        categoryName: category.name,
      })),
    );

    res.status(200).json({
      data: {
        locations,
        services,
        addons,
      },
    });
  } catch {
    return internalServerError(res);
  }
};

export { getBookingOptions };

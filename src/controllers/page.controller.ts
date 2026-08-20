import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { FaqPage, SitePage } from '../generated/prisma/enums';

const getFaqPage = async (_req: Request, res: Response) => {
  try {
    const [hero, faqCategories, sectionOutro] = await Promise.all([
      prisma.hero.findFirst({
        where: { page: SitePage.FAQ, isActive: true },
      }),
      prisma.faqCategory.findMany({
        where: { page: FaqPage.MAIN, isActive: true },
        include: {
          faqs: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } },
        },
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.sectionOutro.findFirst({
        where: { page: SitePage.FAQ, isActive: true },
      }),
    ]);

    res.status(200).json({
      data: {
        page: SitePage.FAQ,
        hero,
        faqCategories,
        sectionOutro,
      },
    });
  } catch {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

const getTestimonialsPage = async (_req: Request, res: Response) => {
  try {
    const [hero, testimonialCategories, sectionOutro] = await Promise.all([
      prisma.hero.findFirst({
        where: { page: SitePage.TESTIMONIALS, isActive: true },
      }),
      prisma.testimonialCategory.findMany({
        where: { isActive: true },
        include: {
          testimonials: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
          },
        },
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.sectionOutro.findFirst({
        where: { page: SitePage.TESTIMONIALS, isActive: true },
      }),
    ]);

    res.status(200).json({
      data: {
        page: SitePage.TESTIMONIALS,
        hero,
        testimonialCategories,
        sectionOutro,
      },
    });
  } catch {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

const getLegalPage = async (page: typeof SitePage.TERMS | typeof SitePage.PRIVACY) => {
  const [hero, legalDocument] = await Promise.all([
    prisma.hero.findFirst({
      where: { page, isActive: true },
    }),
    prisma.legalDocument.findFirst({
      where: { page, isActive: true },
    }),
  ]);

  return {
    page,
    hero,
    legalDocument,
  };
};

const getTermsPage = async (_req: Request, res: Response) => {
  try {
    const data = await getLegalPage(SitePage.TERMS);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

const getPrivacyPage = async (_req: Request, res: Response) => {
  try {
    const data = await getLegalPage(SitePage.PRIVACY);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

const getAboutPage = async (_req: Request, res: Response) => {
  try {
    const [
      hero,
      contentBlocks,
      ecosystemIntro,
      ecosystemFeatures,
      milestonesIntro,
      milestoneStats,
      sectionOutro,
    ] = await Promise.all([
      prisma.hero.findFirst({
        where: { page: SitePage.ABOUT, isActive: true },
      }),
      prisma.contentBlock.findMany({
        where: { page: SitePage.ABOUT, isActive: true },
      }),
      prisma.sectionIntro.findFirst({
        where: {
          page: SitePage.ABOUT,
          sectionKey: 'ECOSYSTEM',
          isActive: true,
        },
      }),
      prisma.featureItem.findMany({
        where: {
          page: SitePage.ABOUT,
          sectionKey: 'ECOSYSTEM',
          isActive: true,
        },
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.sectionIntro.findFirst({
        where: {
          page: SitePage.ABOUT,
          sectionKey: 'MILESTONES',
          isActive: true,
        },
      }),
      prisma.milestoneStat.findMany({
        where: {
          page: SitePage.ABOUT,
          sectionKey: 'MILESTONES',
          isActive: true,
        },
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.sectionOutro.findFirst({
        where: { page: SitePage.ABOUT, isActive: true },
      }),
    ]);

    res.status(200).json({
      data: {
        page: SitePage.ABOUT,
        hero,
        contentBlocks: Object.fromEntries(
          contentBlocks.map((block) => [block.sectionKey, block]),
        ),
        ecosystem: {
          intro: ecosystemIntro,
          items: ecosystemFeatures,
        },
        milestones: {
          intro: milestonesIntro,
          stats: milestoneStats,
        },
        sectionOutro,
      },
    });
  } catch {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

const activeSection = (page: SitePage, sectionKey: string) => ({
  page,
  sectionKey,
  isActive: true as const,
});

const findHero = (page: SitePage) =>
  prisma.hero.findFirst({
    where: { page, isActive: true },
  });

const findOutro = (page: SitePage) =>
  prisma.sectionOutro.findFirst({
    where: { page, isActive: true },
  });

const findIntro = (page: SitePage, sectionKey: string) =>
  prisma.sectionIntro.findFirst({
    where: activeSection(page, sectionKey),
  });

const findNote = (page: SitePage, sectionKey: string) =>
  prisma.contentBlock.findFirst({
    where: activeSection(page, sectionKey),
  });

const findOfferCards = (page: SitePage, sectionKey: string) =>
  prisma.offerCard.findMany({
    where: activeSection(page, sectionKey),
    orderBy: { sortOrder: 'asc' },
  });

const findFeatureItems = (page: SitePage, sectionKey: string) =>
  prisma.featureItem.findMany({
    where: activeSection(page, sectionKey),
    orderBy: { sortOrder: 'asc' },
  });

const findStepItems = (page: SitePage, sectionKey: string) =>
  prisma.stepItem.findMany({
    where: activeSection(page, sectionKey),
    orderBy: { sortOrder: 'asc' },
  });

const getLocationsPage = async (_req: Request, res: Response) => {
  try {
    const [
      hero,
      housesIntro,
      houses,
      coverageIntro,
      coverageAreas,
      coverageNote,
      bookingIntro,
      bookingItems,
      sectionOutro,
    ] = await Promise.all([
      findHero(SitePage.LOCATIONS),
      findIntro(SitePage.LOCATIONS, 'LOCATION_HOUSES'),
      findOfferCards(SitePage.LOCATIONS, 'LOCATION_HOUSES'),
      findIntro(SitePage.LOCATIONS, 'LOCATION_COVERAGE'),
      findFeatureItems(SitePage.LOCATIONS, 'LOCATION_COVERAGE'),
      findNote(SitePage.LOCATIONS, 'COVERAGE_NOTE'),
      findIntro(SitePage.LOCATIONS, 'LOCATION_BOOKING_ARRIVAL'),
      findFeatureItems(SitePage.LOCATIONS, 'LOCATION_BOOKING_ARRIVAL'),
      findOutro(SitePage.LOCATIONS),
    ]);

    res.status(200).json({
      data: {
        page: SitePage.LOCATIONS,
        hero,
        houses: {
          intro: housesIntro,
          items: houses,
        },
        coverage: {
          intro: coverageIntro,
          items: coverageAreas,
          note: coverageNote,
        },
        bookingArrival: {
          intro: bookingIntro,
          items: bookingItems,
        },
        sectionOutro,
      },
    });
  } catch {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

const getGiftVouchersPage = async (_req: Request, res: Response) => {
  try {
    const [
      hero,
      optionsIntro,
      options,
      optionsNote,
      policyIntro,
      policyItems,
      stepsIntro,
      steps,
      sectionOutro,
    ] = await Promise.all([
      findHero(SitePage.GIFT_VOUCHERS),
      findIntro(SitePage.GIFT_VOUCHERS, 'VOUCHER_OPTIONS'),
      findOfferCards(SitePage.GIFT_VOUCHERS, 'VOUCHER_OPTIONS'),
      findNote(SitePage.GIFT_VOUCHERS, 'VOUCHER_NOTE'),
      findIntro(SitePage.GIFT_VOUCHERS, 'VOUCHER_POLICY'),
      findFeatureItems(SitePage.GIFT_VOUCHERS, 'VOUCHER_POLICY'),
      findIntro(SitePage.GIFT_VOUCHERS, 'VOUCHER_STEPS'),
      findStepItems(SitePage.GIFT_VOUCHERS, 'VOUCHER_STEPS'),
      findOutro(SitePage.GIFT_VOUCHERS),
    ]);

    res.status(200).json({
      data: {
        page: SitePage.GIFT_VOUCHERS,
        hero,
        options: {
          intro: optionsIntro,
          items: options,
          note: optionsNote,
        },
        policy: {
          intro: policyIntro,
          items: policyItems,
        },
        steps: {
          intro: stepsIntro,
          items: steps,
        },
        sectionOutro,
      },
    });
  } catch {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

const getPackagesPage = async (_req: Request, res: Response) => {
  try {
    const [
      hero,
      sizesIntro,
      sizes,
      sizesNote,
      benefitsIntro,
      benefits,
      stepsIntro,
      steps,
      faqIntro,
      faqCategories,
      sectionOutro,
    ] = await Promise.all([
      findHero(SitePage.PACKAGES),
      findIntro(SitePage.PACKAGES, 'PACKAGE_SIZES'),
      findOfferCards(SitePage.PACKAGES, 'PACKAGE_SIZES'),
      findNote(SitePage.PACKAGES, 'PACKAGE_NOTE'),
      findIntro(SitePage.PACKAGES, 'PACKAGE_BENEFITS'),
      findFeatureItems(SitePage.PACKAGES, 'PACKAGE_BENEFITS'),
      findIntro(SitePage.PACKAGES, 'PACKAGES_HOW_IT_WORKS'),
      findStepItems(SitePage.PACKAGES, 'PACKAGES_HOW_IT_WORKS'),
      findIntro(SitePage.PACKAGES, 'PACKAGE_FAQ'),
      prisma.faqCategory.findMany({
        where: { page: FaqPage.PACKAGES, isActive: true },
        include: {
          faqs: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } },
        },
        orderBy: { sortOrder: 'asc' },
      }),
      findOutro(SitePage.PACKAGES),
    ]);

    res.status(200).json({
      data: {
        page: SitePage.PACKAGES,
        hero,
        sizes: {
          intro: sizesIntro,
          items: sizes,
          note: sizesNote,
        },
        benefits: {
          intro: benefitsIntro,
          items: benefits,
        },
        howItWorks: {
          intro: stepsIntro,
          items: steps,
        },
        faq: {
          intro: faqIntro,
          categories: faqCategories,
        },
        sectionOutro,
      },
    });
  } catch {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

const getCareersPage = async (_req: Request, res: Response) => {
  try {
    const [
      hero,
      whyWorkHereIntro,
      whyWorkHereSteps,
      openRolesIntro,
      jobOpenings,
      academyPathwayIntro,
      academyPathwaySteps,
      howToApplyIntro,
      howToApplySteps,
      sectionOutro,
    ] = await Promise.all([
      findHero(SitePage.CAREERS),
      findIntro(SitePage.CAREERS, 'WHY_WORK_HERE'),
      findStepItems(SitePage.CAREERS, 'WHY_WORK_HERE'),
      findIntro(SitePage.CAREERS, 'OPEN_ROLES'),
      prisma.jobOpening.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      }),
      findIntro(SitePage.CAREERS, 'ACADEMY_PATHWAY'),
      findStepItems(SitePage.CAREERS, 'ACADEMY_PATHWAY'),
      findIntro(SitePage.CAREERS, 'HOW_TO_APPLY'),
      findStepItems(SitePage.CAREERS, 'HOW_TO_APPLY'),
      findOutro(SitePage.CAREERS),
    ]);

    res.status(200).json({
      data: {
        page: SitePage.CAREERS,
        hero,
        whyWorkHere: {
          intro: whyWorkHereIntro,
          items: whyWorkHereSteps,
        },
        openRoles: {
          intro: openRolesIntro,
          items: jobOpenings,
        },
        academyPathway: {
          intro: academyPathwayIntro,
          items: academyPathwaySteps,
        },
        howToApply: {
          intro: howToApplyIntro,
          items: howToApplySteps,
        },
        sectionOutro,
      },
    });
  } catch {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
};

export {
  getFaqPage,
  getTestimonialsPage,
  getTermsPage,
  getPrivacyPage,
  getAboutPage,
  getLocationsPage,
  getGiftVouchersPage,
  getPackagesPage,
  getCareersPage,
};

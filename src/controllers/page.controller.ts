import { Request, Response } from 'express';
import { prisma } from '../config/db';
import {
  CategoryPriceKind,
  FaqPage,
  SitePage,
} from '../generated/prisma/enums';
import { asString, formatNameList, internalServerError } from '../utils/helpers';

// -- FAQ --

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
    return internalServerError(res);
  }
};

// -- Testimonials --

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
    return internalServerError(res);
  }
};

// -- Legal (Terms / Privacy) --

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
    return internalServerError(res);
  }
};

const getPrivacyPage = async (_req: Request, res: Response) => {
  try {
    const data = await getLegalPage(SitePage.PRIVACY);
    res.status(200).json({ data });
  } catch {
    return internalServerError(res);
  }
};

// -- About --

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
    return internalServerError(res);
  }
};

// -- Shared helpers --

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

const findMilestoneStats = (page: SitePage, sectionKey: string) =>
  prisma.milestoneStat.findMany({
    where: activeSection(page, sectionKey),
    orderBy: { sortOrder: 'asc' },
  });

// -- Locations --

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
    return internalServerError(res);
  }
};

// -- Gift vouchers --

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
    return internalServerError(res);
  }
};

// -- Packages --

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
    return internalServerError(res);
  }
};

// -- Careers --

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
    return internalServerError(res);
  }
};

// -- Corporate --

const getCorporatePage = async (_req: Request, res: Response) => {
  try {
    const [
      hero,
      occasionsIntro,
      occasions,
      corporateWellnessIntro,
      corporateWellnessItems,
      wellnessEventsIntro,
      wellnessEventsItems,
      onSiteDeliveryIntro,
      onSiteDeliveryInclusions,
      onSiteDeliveryScales,
      whyPartnersIntro,
      whyPartnersItems,
    ] = await Promise.all([
      findHero(SitePage.CORPORATE),
      findIntro(SitePage.CORPORATE, 'TWO_OCCASIONS'),
      findOfferCards(SitePage.CORPORATE, 'TWO_OCCASIONS'),
      findIntro(SitePage.CORPORATE, 'CORPORATE_WELLNESS'),
      findFeatureItems(SitePage.CORPORATE, 'CORPORATE_WELLNESS'),
      findIntro(SitePage.CORPORATE, 'WELLNESS_EVENTS'),
      findFeatureItems(SitePage.CORPORATE, 'WELLNESS_EVENTS'),
      findIntro(SitePage.CORPORATE, 'ON_SITE_DELIVERY'),
      findFeatureItems(SitePage.CORPORATE, 'ON_SITE_DELIVERY'),
      findMilestoneStats(SitePage.CORPORATE, 'ON_SITE_DELIVERY'),
      findIntro(SitePage.CORPORATE, 'WHY_PARTNERS'),
      findFeatureItems(SitePage.CORPORATE, 'WHY_PARTNERS'),
    ]);

    res.status(200).json({
      data: {
        page: SitePage.CORPORATE,
        hero,
        occasions: {
          intro: occasionsIntro,
          items: occasions,
        },
        corporateWellness: {
          intro: corporateWellnessIntro,
          items: corporateWellnessItems,
        },
        wellnessEvents: {
          intro: wellnessEventsIntro,
          items: wellnessEventsItems,
        },
        onSiteDelivery: {
          intro: onSiteDeliveryIntro,
          inclusions: onSiteDeliveryInclusions,
          scales: onSiteDeliveryScales,
        },
        whyPartners: {
          intro: whyPartnersIntro,
          items: whyPartnersItems,
        },
      },
    });
  } catch {
    return internalServerError(res);
  }
};

// -- Academy --

const getAcademyPage = async (_req: Request, res: Response) => {
  try {
    const [
      hero,
      trainedByKureIntro,
      whatWeTeachIntro,
      formats,
      categories,
      categoryFooter,
      whatWeTeachNote,
      howItWorksIntro,
      howItWorksItems,
      certificationIntro,
      certificationContent,
      academyMethod,
      enrollmentIntro,
      enrollmentItems,
      faqCategories,
      sectionOutro,
    ] = await Promise.all([
      findHero(SitePage.ACADEMY),
      findIntro(SitePage.ACADEMY, 'TRAINED_BY_KURE'),
      findIntro(SitePage.ACADEMY, 'WHAT_WE_TEACH'),
      findFeatureItems(SitePage.ACADEMY, 'ACADEMY_FORMATS'),
      findFeatureItems(SitePage.ACADEMY, 'ACADEMY_CATEGORIES'),
      findNote(SitePage.ACADEMY, 'ACADEMY_CATEGORY_FOOTER'),
      findNote(SitePage.ACADEMY, 'WHAT_WE_TEACH_NOTE'),
      findIntro(SitePage.ACADEMY, 'ACADEMY_HOW_IT_WORKS'),
      findStepItems(SitePage.ACADEMY, 'ACADEMY_HOW_IT_WORKS'),
      findIntro(SitePage.ACADEMY, 'CERTIFICATION'),
      findNote(SitePage.ACADEMY, 'CERTIFICATION'),
      findNote(SitePage.ACADEMY, 'ACADEMY_METHOD'),
      findIntro(SitePage.ACADEMY, 'ENROLLMENT'),
      findStepItems(SitePage.ACADEMY, 'ENROLLMENT'),
      prisma.faqCategory.findMany({
        where: { page: FaqPage.ACADEMY, isActive: true },
        include: {
          faqs: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } },
        },
        orderBy: { sortOrder: 'asc' },
      }),
      findOutro(SitePage.ACADEMY),
    ]);

    res.status(200).json({
      data: {
        page: SitePage.ACADEMY,
        hero,
        trainedByKure: {
          intro: trainedByKureIntro,
        },
        whatWeTeach: {
          intro: whatWeTeachIntro,
          formats,
          categories,
          categoryFooter,
          note: whatWeTeachNote,
        },
        howItWorks: {
          intro: howItWorksIntro,
          items: howItWorksItems,
        },
        certification: {
          intro: certificationIntro,
          content: certificationContent,
          methodNote: academyMethod,
        },
        enrollment: {
          intro: enrollmentIntro,
          items: enrollmentItems,
        },
        faq: {
          categories: faqCategories,
        },
        sectionOutro,
      },
    });
  } catch {
    return internalServerError(res);
  }
};

// -- Services --

const serviceCategoryInclude = {
  currency: true,
  services: {
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' as const },
  },
  prices: {
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' as const },
  },
  addons: {
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' as const },
  },
};

const getServicesPage = async (_req: Request, res: Response) => {
  try {
    const [
      hero,
      categories,
      receiveCareIntro,
      receiveCareItems,
      receiveCareNote,
      kureStandardIntro,
      kureStandardContent,
      kureStandardStats,
      sectionOutro,
    ] = await Promise.all([
      findHero(SitePage.SERVICES),
      prisma.serviceCategory.findMany({
        where: { isActive: true },
        include: serviceCategoryInclude,
        orderBy: { sortOrder: 'asc' },
      }),
      findIntro(SitePage.SERVICES, 'RECEIVE_CARE'),
      findFeatureItems(SitePage.SERVICES, 'RECEIVE_CARE'),
      findNote(SitePage.SERVICES, 'RECEIVE_CARE_NOTE'),
      findIntro(SitePage.SERVICES, 'KURE_STANDARD'),
      findNote(SitePage.SERVICES, 'KURE_STANDARD'),
      findMilestoneStats(SitePage.SERVICES, 'KURE_STANDARD'),
      findOutro(SitePage.SERVICES),
    ]);

    res.status(200).json({
      data: {
        page: SitePage.SERVICES,
        hero,
        categories,
        receiveCare: {
          intro: receiveCareIntro,
          items: receiveCareItems,
          note: receiveCareNote,
        },
        kureStandard: {
          intro: kureStandardIntro,
          content: kureStandardContent,
          stats: kureStandardStats,
        },
        sectionOutro,
      },
    });
  } catch {
    return internalServerError(res);
  }
};

const getServiceCategoryPage = async (req: Request, res: Response) => {
  const slug = asString(req.params.slug);

  if (!slug) {
    return res.status(400).json({
      error: { message: 'Slug is required', code: 'BAD_REQUEST' },
    });
  }

  try {
    const [category, standardIntro, sectionOutro] = await Promise.all([
      prisma.serviceCategory.findFirst({
        where: { slug, isActive: true },
        include: serviceCategoryInclude,
      }),
      findIntro(SitePage.SERVICES, 'CATEGORY_STANDARD'),
      findOutro(SitePage.SERVICES),
    ]);

    if (!category) {
      return res.status(404).json({
        error: { message: 'Service category not found', code: 'NOT_FOUND' },
      });
    }

    res.status(200).json({
      data: {
        page: SitePage.SERVICES,
        category,
        standard: {
          intro: standardIntro,
        },
        sectionOutro,
      },
    });
  } catch {
    return internalServerError(res);
  }
};

// -- Home --

const formatCategoryPriceSummary = (
  symbol: string,
  prices: { label: string; price: number; kind: CategoryPriceKind }[],
) => {
  const firstSingle = prices.find((price) => price.kind === CategoryPriceKind.SINGLE);
  if (!firstSingle) return null;

  const firstPackage = prices.find(
    (price) => price.kind === CategoryPriceKind.PACKAGE,
  );

  const parts = [`From ${symbol}${firstSingle.price}`, firstSingle.label];
  if (firstPackage) {
    parts.push(`${firstPackage.label} ${symbol}${firstPackage.price}`);
  }

  return parts.join(' · ');
};

const getHomePage = async (_req: Request, res: Response) => {
  try {
    const [
      hero,
      milestoneStats,
      packagesIntro,
      packageOffers,
      categoriesIntro,
      categories,
      howItWorksIntro,
      howItWorksItems,
      coverageIntro,
      coverageAreas,
      coverageNote,
      beyondIntro,
      beyondItems,
      testimonialsIntro,
      featuredTestimonials,
      sectionOutro,
    ] = await Promise.all([
      findHero(SitePage.HOME),
      findMilestoneStats(SitePage.ABOUT, 'MILESTONES'),
      findIntro(SitePage.HOME, 'HOME_PACKAGES'),
      findOfferCards(SitePage.PACKAGES, 'PACKAGE_SIZES'),
      findIntro(SitePage.HOME, 'HOME_CATEGORIES'),
      prisma.serviceCategory.findMany({
        where: { isActive: true },
        include: serviceCategoryInclude,
        orderBy: { sortOrder: 'asc' },
      }),
      findIntro(SitePage.HOME, 'HOME_HOW_IT_WORKS'),
      findStepItems(SitePage.HOME, 'HOME_HOW_IT_WORKS'),
      findIntro(SitePage.LOCATIONS, 'LOCATION_COVERAGE'),
      findFeatureItems(SitePage.LOCATIONS, 'LOCATION_COVERAGE'),
      findNote(SitePage.LOCATIONS, 'COVERAGE_NOTE'),
      findIntro(SitePage.HOME, 'HOME_BEYOND'),
      findOfferCards(SitePage.HOME, 'HOME_BEYOND'),
      findIntro(SitePage.HOME, 'HOME_TESTIMONIALS'),
      prisma.testimonialCategory.findFirst({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        include: {
          testimonials: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            take: 3,
          },
        },
      }),
      findOutro(SitePage.HOME),
    ]);

    res.status(200).json({
      data: {
        page: SitePage.HOME,
        hero,
        milestones: {
          stats: milestoneStats,
        },
        packages: {
          intro: packagesIntro,
          items: packageOffers,
        },
        categories: {
          intro: categoriesIntro,
          items: categories.map((category) => ({
            ...category,
            servicesLine: formatNameList(
              category.services.map((service) => service.name),
            ),
            priceSummary: formatCategoryPriceSummary(
              category.currency.symbol,
              category.prices,
            ),
          })),
        },
        howItWorks: {
          intro: howItWorksIntro,
          items: howItWorksItems,
        },
        coverage: {
          intro: coverageIntro,
          items: coverageAreas,
          note: coverageNote,
        },
        beyond: {
          intro: beyondIntro,
          items: beyondItems,
        },
        testimonials: {
          intro: testimonialsIntro,
          items: featuredTestimonials?.testimonials ?? [],
        },
        sectionOutro,
      },
    });
  } catch {
    return internalServerError(res);
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
  getCorporatePage,
  getAcademyPage,
  getServicesPage,
  getServiceCategoryPage,
  getHomePage,
};

import { Router } from 'express';
import {
  createCategoryAddon,
  createCategoryPrice,
  createCurrency,
  createService,
  createServiceCategory,
  deleteCategoryAddon,
  deleteCategoryPrice,
  deleteCurrency,
  deleteService,
  deleteServiceCategory,
  getCategoryAddon,
  getCategoryAddons,
  getCategoryPrice,
  getCategoryPrices,
  getCurrencies,
  getCurrency,
  getService,
  getServiceCategories,
  getServiceCategory,
  getServices,
  updateCategoryAddon,
  updateCategoryPrice,
  updateCurrency,
  updateService,
  updateServiceCategory,
} from '../../controllers/admin/service-catalog.controller';
import { validate } from '../../middleware/validate.middleware';
import {
  createCategoryAddonSchema,
  createCategoryPriceSchema,
  createCurrencySchema,
  createServiceCategorySchema,
  createServiceSchema,
  deleteCategoryAddonSchema,
  deleteCategoryPriceSchema,
  deleteCurrencySchema,
  deleteServiceCategorySchema,
  deleteServiceSchema,
  getCategoryAddonSchema,
  getCategoryAddonsSchema,
  getCategoryPriceSchema,
  getCategoryPricesSchema,
  getCurrenciesSchema,
  getCurrencySchema,
  getServiceCategoriesSchema,
  getServiceCategorySchema,
  getServiceSchema,
  getServicesSchema,
  updateCategoryAddonSchema,
  updateCategoryPriceSchema,
  updateCurrencySchema,
  updateServiceCategorySchema,
  updateServiceSchema,
} from '../../schemas/service-catalog.schema';

const currencyRoutes = Router();
currencyRoutes.get('/', validate(getCurrenciesSchema), getCurrencies);
currencyRoutes.post('/', validate(createCurrencySchema), createCurrency);
currencyRoutes.get('/:id', validate(getCurrencySchema), getCurrency);
currencyRoutes.put('/:id', validate(updateCurrencySchema), updateCurrency);
currencyRoutes.delete('/:id', validate(deleteCurrencySchema), deleteCurrency);

const serviceCategoryRoutes = Router();
serviceCategoryRoutes.get(
  '/',
  validate(getServiceCategoriesSchema),
  getServiceCategories,
);
serviceCategoryRoutes.post(
  '/',
  validate(createServiceCategorySchema),
  createServiceCategory,
);
serviceCategoryRoutes.get(
  '/:id',
  validate(getServiceCategorySchema),
  getServiceCategory,
);
serviceCategoryRoutes.put(
  '/:id',
  validate(updateServiceCategorySchema),
  updateServiceCategory,
);
serviceCategoryRoutes.delete(
  '/:id',
  validate(deleteServiceCategorySchema),
  deleteServiceCategory,
);

const serviceRoutes = Router();
serviceRoutes.get('/', validate(getServicesSchema), getServices);
serviceRoutes.post('/', validate(createServiceSchema), createService);
serviceRoutes.get('/:id', validate(getServiceSchema), getService);
serviceRoutes.put('/:id', validate(updateServiceSchema), updateService);
serviceRoutes.delete('/:id', validate(deleteServiceSchema), deleteService);

const categoryPriceRoutes = Router();
categoryPriceRoutes.get('/', validate(getCategoryPricesSchema), getCategoryPrices);
categoryPriceRoutes.post(
  '/',
  validate(createCategoryPriceSchema),
  createCategoryPrice,
);
categoryPriceRoutes.get('/:id', validate(getCategoryPriceSchema), getCategoryPrice);
categoryPriceRoutes.put(
  '/:id',
  validate(updateCategoryPriceSchema),
  updateCategoryPrice,
);
categoryPriceRoutes.delete(
  '/:id',
  validate(deleteCategoryPriceSchema),
  deleteCategoryPrice,
);

const categoryAddonRoutes = Router();
categoryAddonRoutes.get('/', validate(getCategoryAddonsSchema), getCategoryAddons);
categoryAddonRoutes.post(
  '/',
  validate(createCategoryAddonSchema),
  createCategoryAddon,
);
categoryAddonRoutes.get('/:id', validate(getCategoryAddonSchema), getCategoryAddon);
categoryAddonRoutes.put(
  '/:id',
  validate(updateCategoryAddonSchema),
  updateCategoryAddon,
);
categoryAddonRoutes.delete(
  '/:id',
  validate(deleteCategoryAddonSchema),
  deleteCategoryAddon,
);

export {
  currencyRoutes,
  serviceCategoryRoutes,
  serviceRoutes,
  categoryPriceRoutes,
  categoryAddonRoutes,
};

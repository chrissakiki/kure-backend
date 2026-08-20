import { Router } from 'express';
import {
  createHero,
  deleteHero,
  getHero,
  getHeroes,
  updateHero,
} from '../../controllers/admin/hero.controller';
import { validate } from '../../middleware/validate.middleware';
import {
  createHeroSchema,
  deleteHeroSchema,
  getHeroSchema,
  getHeroesSchema,
  updateHeroSchema,
} from '../../schemas/hero.schema';

const router = Router();

router.get('/', validate(getHeroesSchema), getHeroes);
router.post('/', validate(createHeroSchema), createHero);
router.get('/:id', validate(getHeroSchema), getHero);
router.put('/:id', validate(updateHeroSchema), updateHero);
router.delete('/:id', validate(deleteHeroSchema), deleteHero);

export default router;

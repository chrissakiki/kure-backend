import { Router } from 'express';
import {
  createJobOpening,
  deleteJobOpening,
  getJobOpening,
  getJobOpenings,
  updateJobOpening,
} from '../../controllers/admin/job-opening.controller';
import { validate } from '../../middleware/validate.middleware';
import {
  createJobOpeningSchema,
  deleteJobOpeningSchema,
  getJobOpeningSchema,
  getJobOpeningsSchema,
  updateJobOpeningSchema,
} from '../../schemas/job-opening.schema';

const router = Router();

router.get('/', validate(getJobOpeningsSchema), getJobOpenings);
router.post('/', validate(createJobOpeningSchema), createJobOpening);
router.get('/:id', validate(getJobOpeningSchema), getJobOpening);
router.put('/:id', validate(updateJobOpeningSchema), updateJobOpening);
router.delete('/:id', validate(deleteJobOpeningSchema), deleteJobOpening);

export default router;

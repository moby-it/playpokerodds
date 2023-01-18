import express from 'express';
import { liveness } from './liveness';
import { readiness } from './readiness';

const router = express.Router();

router.get('/readiness', readiness);
router.post('/liveness', liveness);

export { router as HealthRouter };

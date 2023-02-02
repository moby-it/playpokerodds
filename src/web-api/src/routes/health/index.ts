import express from 'express';
import { logError } from './error';
import { liveness } from './liveness';
import { readiness } from './readiness';

const router = express.Router();

router.get('/readiness', readiness);
router.get('/liveness', liveness);
router.post('/logError', logError);

export { router as HealthRouter };

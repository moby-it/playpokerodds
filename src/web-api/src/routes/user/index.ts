import express from 'express';
import { fetchUserProfileByNameEndpoint } from './fetchUserByUsername';

const router = express.Router();

router.put('/update', []);
router.get('/fetchByUsername/:username', ...fetchUserProfileByNameEndpoint);

export { router as UserRouter };

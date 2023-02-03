import express from 'express';
import { fetchUserProfileByNameEndpoint } from './fetchUserByUsername';
import { updateUserEndpoint } from './updateUser';

const router = express.Router();

router.put('/update', ...updateUserEndpoint);
router.get('/fetchByUsername/:username', ...fetchUserProfileByNameEndpoint);

export { router as UserRouter };

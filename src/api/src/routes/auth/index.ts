import express from 'express';
import { changeUsernameEndpoint } from './changeUsername';

import { login } from './login';
import { register } from './register';

const router = express.Router();

router.post('/login', ...login);
router.post('/register', ...register);
router.post('/changeUsername', ...changeUsernameEndpoint);
export { router as AuthRouter };

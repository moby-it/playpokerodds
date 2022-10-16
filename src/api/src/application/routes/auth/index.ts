import express from 'express';
import { changeUsernameEndpoint } from './changeUsername';

import { loginEndpoint } from './login';
import { registerEntpoint } from './register';

const router = express.Router();

router.post('/login', ...loginEndpoint);
router.post('/register', ...registerEntpoint);
router.post('/changeUsername', ...changeUsernameEndpoint);

export { router as AuthRouter };

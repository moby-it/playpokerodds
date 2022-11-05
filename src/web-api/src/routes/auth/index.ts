import express from 'express';
import { adminLoginEndpoint } from './adminLogin';
import { changeUsernameEndpoint } from './changeUsername';

import { loginEndpoint } from './login';
import { registerEntpoint } from './register';

const router = express.Router();

router.post('/login', ...loginEndpoint);
router.post('/register', ...registerEntpoint);
router.post('/refreshToken', ...registerEntpoint);
router.post('/changeUsername', ...changeUsernameEndpoint);
router.post('/admin-login', ...adminLoginEndpoint);

export { router as AuthRouter };

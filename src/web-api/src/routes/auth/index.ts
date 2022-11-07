import express from 'express';
import { adminLoginEndpoint } from './adminLogin';
import { changeUsernameEndpoint } from './changeUsername';

import { loginEndpoint } from './login';
import { refreshTokenEndpoint } from './refreshToken';
import { registerEntpoint } from './register';

const router = express.Router();

router.post('/login', ...loginEndpoint);
router.post('/register', ...registerEntpoint);
router.get('/refreshToken', ...refreshTokenEndpoint);
router.post('/changeUsername', ...changeUsernameEndpoint);
router.post('/admin-login', ...adminLoginEndpoint);

export { router as AuthRouter };

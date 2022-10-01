import express from 'express';
import { fetchRound } from './fetchRound';
import { postRoundAnswer } from './postRoundAnswer';

const router = express.Router();

router.post('/postRoundAnswer', ...postRoundAnswer);
router.get('/fetchRound', ...fetchRound);

export { router as PokerRouter };

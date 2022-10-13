import express from 'express';
import { fetchRandomRound } from './fetchRandomRound';
import { fetchRound } from './fetchRound';
import { postRoundAnswer } from './postRoundAnswer';

const router = express.Router();

router.post('/postRoundAnswer', ...postRoundAnswer);
router.get('/fetchRound', ...fetchRound);
router.get('/fetchRandomRound', ...fetchRandomRound);

export { router as PokerRouter };

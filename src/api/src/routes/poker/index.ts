import express from 'express';
import { fetchLeaderBoardsEndpoint } from './fetchLeaderboards';
import { fetchRandomRound } from './fetchRandomRound';
import { fetchRound } from './fetchRound';
import { postRoundAnswer } from './postRoundAnswer';

const router = express.Router();

router.post('/postRoundAnswer', ...postRoundAnswer);
router.get('/fetchRound', ...fetchRound);
router.get('/fetchLeaderboards', ...fetchLeaderBoardsEndpoint);
router.get('/fetchRandomRound', ...fetchRandomRound);

export { router as PokerRouter };

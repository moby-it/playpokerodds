import express from 'express';
import { fetchEventsEndpoint } from './fetchEvents';
import { fetchLeaderBoardsEndpoint } from './fetchLeaderboards';
import { fetchRandomRound } from './fetchRandomRound';
import { fetchRound } from './fetchRound';
import { fetchRoundById } from './fetchRoundById';
import { postNewRoundAnswer, postExistingRoundAnswer } from './postRoundAnswer';

const router = express.Router();

router.post('/postNewRoundAnswer', ...postNewRoundAnswer);
router.post('/postExistingRoundAnswer', ...postExistingRoundAnswer);
router.get('/fetchRoundById/:id', ...fetchRoundById);
router.get('/fetchRound', ...fetchRound);
router.get('/fetchLeaderboards', ...fetchLeaderBoardsEndpoint);
router.get('/fetchRandomRound', ...fetchRandomRound);
router.get('/fetchEvents', ...fetchEventsEndpoint);

export { router as PokerRouter };

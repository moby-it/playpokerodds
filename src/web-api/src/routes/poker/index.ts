import express from 'express';
import { fetchEventsEndpoint } from './fetchEvents';
import { fetchLeaderBoardsEndpoint } from './fetchLeaderboards';
import { fetchRandomRound } from './fetchRandomRound';
import { fetchRound } from './fetchRound';
import { fetchRoundById } from './fetchRoundById';

import { postExistingRoundAnswer, postNewRoundAnswer } from './postRoundAnswer';
import {
  addToFavoritesEndpoint,
  removeFromFavoritesEndpoint,
} from './roundFavorites';

const router = express.Router();

router.post('/postNewRoundAnswer', ...postNewRoundAnswer);
router.post('/postExistingRoundAnswer', ...postExistingRoundAnswer);
router.put('/addToFavorites/:roundId', ...addToFavoritesEndpoint);
router.put('/removeFromFavorites/:roundId', ...removeFromFavoritesEndpoint);
router.get('/fetchRoundById/:id', ...fetchRoundById);
router.get('/fetchRound', ...fetchRound);
router.get('/fetchLeaderboards', ...fetchLeaderBoardsEndpoint);
router.get('/fetchRandomRound', ...fetchRandomRound);

router.get('/fetchEvents', ...fetchEventsEndpoint);

export { RoundAnswerResponse } from './postRoundAnswer/RoundAnswerResponse';
export { router as PokerRouter };

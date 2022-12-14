import { estimateAccuracy } from './estimateAccuracy';
import { pesistUserScore } from '../persistUserScore';
import { calculateWinOdds } from './calculateWinOdds';
import { pesistRound } from './persistRound';
import { validatePayload } from './validatePayload';

export const postNewRoundAnswer = [
  validatePayload,
  calculateWinOdds,
  estimateAccuracy,
  pesistRound,
  pesistUserScore,
];

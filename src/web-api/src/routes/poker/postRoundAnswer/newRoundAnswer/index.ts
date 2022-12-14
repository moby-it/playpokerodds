import { estimateAccuracy } from './estimateAccuracy';
import { pesistUserScore } from '../persistUserScore';
import { calculateWinOdds } from './calculateWinOdds';
import { pesistNewRound } from './persistNewRound';
import { validatePayload } from './validatePayload';

export const postNewRoundAnswer = [
  validatePayload,
  calculateWinOdds,
  estimateAccuracy,
  pesistNewRound,
  pesistUserScore,
];

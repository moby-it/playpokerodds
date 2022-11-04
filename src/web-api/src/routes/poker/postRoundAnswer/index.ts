import { calculateWinOdds } from './calculateWinOdds';
import { estimateAccuracy } from './estimateScore';
import { pesistRound } from './persistRound';
import { pesistUserScore } from './persistUserScore';
import { validatePayload } from './validatePayload';

export const postRoundAnswer = [
  validatePayload,
  calculateWinOdds,
  estimateAccuracy,
  pesistRound,
  pesistUserScore,
];

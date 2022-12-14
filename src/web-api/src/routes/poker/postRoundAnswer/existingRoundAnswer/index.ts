import { pesistUserScore } from '../persistUserScore';
import { estimateAccuracy } from './estimateAccuracy';
import { findRoundById } from './findRoundById';
import { persistExistingRound } from './persistExistingRoundAnswer';
import { validatePayload } from './validatePayload';

export const postExistingRoundAnswer = [
  validatePayload,
  findRoundById,
  estimateAccuracy,
  persistExistingRound,
  pesistUserScore,
];

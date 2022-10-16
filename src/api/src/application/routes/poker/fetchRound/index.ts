import { createNewRound } from './createRound';
import { validatePayload } from './validatePayload';

export const fetchRound = [validatePayload, createNewRound];

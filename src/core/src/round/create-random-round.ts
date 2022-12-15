import { BoardState } from '../board';
import { randomInt } from '../helpers';
import { createRound } from './create-round';
import { Round } from './round';

export function createRandomRound(): Round {
  const totalHands = randomInt(1, 8);
  const totalKnownHands = 0;
  const boardState = randomInt(0, 3) as BoardState;
  return createRound(totalHands, totalKnownHands, boardState);
}

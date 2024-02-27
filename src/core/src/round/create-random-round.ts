import { BoardState } from '../board/boardState.ts';
import { randomInt } from '../helpers/randomInt.ts';
import { createRound } from './create-round.ts';
import { Round } from './round.ts';

export function createRandomRound(): Round {
  const totalHands = randomInt(1, 8);
  const totalKnownHands = 0;
  const boardState = randomInt(0, 3) as BoardState;
  return createRound(totalHands, totalKnownHands, boardState);
}

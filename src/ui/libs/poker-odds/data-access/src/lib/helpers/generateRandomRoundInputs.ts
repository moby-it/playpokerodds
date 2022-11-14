import {
  BoardState,
  RoundInput,
  RoundInputQueryParams,
} from '@moby-it/ppo-core';
import { isLeft } from 'fp-ts/lib/Either';

export function generateRandomRoundInputs(): RoundInputQueryParams {
  const boardState = rng(BoardState.PreFlop, BoardState.Turn);
  const totalHands = rng(2, 5);
  const totalKnownHands = totalHands;
  const validateRoundInput = RoundInput.decode({
    boardState,
    totalHands,
    totalKnownHands,
  });
  if (isLeft(validateRoundInput))
    throw new Error('unable to validate round input');
  const validateRoundInputParams = RoundInputQueryParams.decode({
    boardState: boardState.toString(),
    totalHands: totalHands.toString(),
    totalKnownHands: totalKnownHands.toString(),
  });
  if (isLeft(validateRoundInputParams)) {
    throw new Error('unable to validate round input params');
  }
  return validateRoundInputParams.right;
}
function rng(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

import { BoardState, CreateRoundInputs } from '@moby-it/poker-core';

export function generateRandomRoundInputs(): CreateRoundInputs {
  const boardState = rng(BoardState.PreFlop, BoardState.Turn);
  const totalHands = rng(2, 5);
  const totalKnownHands = totalHands;
  return { boardState, totalHands, totalKnownHands };
}
function rng(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

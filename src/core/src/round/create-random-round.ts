import { pipe } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { randomInt } from 'fp-ts/lib/Random';
import { BoardState } from '../board';
import { createRound } from './create-round';
import { Round } from './round';
import { createRoundInputs } from './round-input';

export const createRandomRound: IO<Round> = () => {
  const totalHands = randomInt(1, 8)();
  const totalKnownHands = 0;
  const boardState = randomInt(0, 3)() as BoardState;

  return pipe(
    createRoundInputs(totalHands, totalKnownHands, boardState),
    createRound
  );
};

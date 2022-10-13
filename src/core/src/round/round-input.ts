import { isRight } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { BoardState } from '../board';

interface TotalHandsBrand {
  readonly TotalHandsC: unique symbol;
}
const TotalHandsBrandC = t.brand(
  t.number,
  (totalHands: number): totalHands is t.Branded<number, TotalHandsBrand> =>
    totalHands < 9,
  'TotalHandsC'
);
interface BoardStateBrand {
  readonly boardState: unique symbol;
}
const BoardStateC = t.brand(
  t.number,
  (boardState: number): boardState is t.Branded<number, BoardStateBrand> =>
    !!BoardState[boardState],
  'boardState'
);
interface TotalKnownHandsBrand {
  readonly TotalKnownHandsBrandC: unique symbol;
}
const TotalKnownHandsBrandC = t.brand(
  t.number,
  (knownHands: number): knownHands is t.Branded<number, TotalKnownHandsBrand> =>
    !isNaN(knownHands),
  'TotalKnownHandsBrandC'
);
export const RoundInput = t.type({
  totalHands: TotalHandsBrandC,
  totalKnownHands: TotalKnownHandsBrandC,
  boardState: BoardStateC,
});
export type RoundInput = t.TypeOf<typeof RoundInput>;

export function createRoundInputs(
  totalHands: number,
  totalKnownHands: number,
  boardState: number
) {
  const totalHandsD = TotalHandsBrandC.decode(totalHands);
  const totalKnownHandsD = TotalKnownHandsBrandC.decode(totalKnownHands);
  const boardStateD = BoardStateC.decode(boardState);
  if (
    isRight(totalHandsD) &&
    isRight(totalKnownHandsD) &&
    isRight(boardStateD)
  ) {
    return {
      boardState: boardStateD.right,
      totalHands: totalHandsD.right,
      totalKnownHands: totalKnownHandsD.right,
    } as RoundInput;
  }
  throw new Error('Invalid round inputs');
}

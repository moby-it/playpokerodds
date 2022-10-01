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

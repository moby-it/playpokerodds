import * as t from 'io-ts';
import { BoardState } from '../board';

interface TotalHandsBrand {
  readonly TotalHandsC: unique symbol;
}
const TotalHandsBrandC = t.brand(
  t.string,
  (totalHands: string): totalHands is t.Branded<string, TotalHandsBrand> =>
    Number(totalHands) < 9,
  'TotalHandsC'
);
interface BoardStateBrand {
  readonly boardState: unique symbol;
}
const BoardStateC = t.brand(
  t.string,
  (boardState: string): boardState is t.Branded<string, BoardStateBrand> =>
    !!BoardState[Number(boardState)],
  'boardState'
);
interface TotalKnownHandsBrand {
  readonly TotalKnownHandsBrandC: unique symbol;
}
const TotalKnownHandsBrandC = t.brand(
  t.string,
  (knownHands: string): knownHands is t.Branded<string, TotalKnownHandsBrand> =>
    !isNaN(Number(knownHands)),
  'TotalKnownHandsBrandC'
);

export const RoundInputQueryParams = t.type({
  totalHands: TotalHandsBrandC,
  totalKnownHands: TotalKnownHandsBrandC,
  boardState: BoardStateC,
});
export type RoundInputQueryParams = t.TypeOf<typeof RoundInputQueryParams>;

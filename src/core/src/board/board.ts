import * as t from 'io-ts';
import { Card } from '../card/card';
export interface BoardBrand {
  readonly BoardBrand: unique symbol;
}
export const Board = t.union([
  t.array(t.string),
  t.brand(
    t.array(Card),
    (board: Card[]): board is t.Branded<Card[], BoardBrand> =>
      board.length >= 0 && board.length <= 5,
    'BoardBrand'
  ),
]);

export type Board = t.TypeOf<typeof Board>;

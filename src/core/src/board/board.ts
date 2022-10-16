import * as t from 'io-ts';
import { Card } from '../card/card';
export interface BoardBrand {
  readonly BoardBrand: unique symbol;
}
export const Board = t.array(Card);

export type Board = t.TypeOf<typeof Board>;

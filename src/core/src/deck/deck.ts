import * as t from 'io-ts';
import { Card } from '../card';
export const Deck = t.array(Card);
export type Deck = t.TypeOf<typeof Deck>;

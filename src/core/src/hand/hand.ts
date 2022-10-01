import * as t from 'io-ts';
import { Card } from '../card';
export const Hand = t.tuple([Card, Card]);
export type Hand = t.TypeOf<typeof Hand>;
export const UnknownHand: Hand = ['..', '..'];

import * as t from 'io-ts';
import { Board } from '../board';
import { Hand } from '../hand';
export const RoundAnswerDto = t.type({
  myHand: Hand,
  opponentsHands: t.array(Hand),
  board: Board,
  estimate: t.number,
});

export type RoundAnswerDto = t.TypeOf<typeof RoundAnswerDto>;

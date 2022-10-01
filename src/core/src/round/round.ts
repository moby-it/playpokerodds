import * as t from 'io-ts';
import { Board } from '../board/board';
import { Hand } from '../hand';
export interface RoundProps {
  myHand: Hand;
  opponentsHands: Hand[];
  board: Board;
}
export const Round = t.type({
  myHand: Hand,
  opponentsHands: t.array(Hand),
  board: Board,
});
export type Round = t.TypeOf<typeof Round>;

export function createRoundFromProps({
  board,
  myHand,
  opponentsHands,
}: RoundProps): Round {
  return { board, myHand, opponentsHands };
}

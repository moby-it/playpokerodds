import { Board } from '../board/board';
import { Hand } from '../hand';

export interface Round {
  myHand: Hand;
  opponentsHands: Hand[];
  board: Board;
}

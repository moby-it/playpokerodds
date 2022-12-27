import { BoardState, validateBoardState } from '../board';
import { Board } from '../board/board';
import { Hand, validateHand } from '../hand';

export interface Round {
  myHand: Hand;
  opponentsHands: Hand[];
  board: Board;
}
export interface CreateRoundInputs {
  totalHands: number;
  totalKnownHands: number;
  boardState: BoardState;
}
export function validateRound(payload: unknown): payload is Round {
  return (
    typeof payload === 'object' &&
    !!payload &&
    'myHand' in payload &&
    validateHand(payload.myHand) &&
    'opponentsHands' in payload &&
    Array.isArray(payload.opponentsHands) &&
    payload.opponentsHands.reduce(
      (prev, current) => current && validateHand(prev),
      true
    ) &&
    'boardState' in payload &&
    validateBoardState(payload.boardState)
  );
}

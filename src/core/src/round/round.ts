import { BoardState, validateBoardState } from '../board';
import { Board } from '../board/board';
import { Card, UnknownCard } from '../card';
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
function _validateRound(payload: unknown): payload is Round {
  const isObject = typeof payload === 'object' && !!payload;
  if (!isObject) return false;
  const p = payload as Record<string, unknown>;
  return (
    'myHand' in p &&
    validateHand(p.myHand) &&
    'opponentsHands' in payload &&
    Array.isArray(p.opponentsHands) &&
    p.opponentsHands.length <= 8 &&
    p.opponentsHands.length > 0 &&
    p.opponentsHands.reduce(
      (accumulator: boolean, currentValue: Hand) =>
        accumulator && validateHand(currentValue),
      true
    ) &&
    'boardState' in p &&
    validateBoardState(p.boardState)
  );
}
function roundHasDuplicateCard(round: Round): boolean {
  const cards: Card[] = [
    ...round.myHand,
    ...round.opponentsHands.flat(),
  ].filter((c) => c !== UnknownCard);
  return cards.length !== new Set(cards).size;
}
export function validateRound(payload: unknown): payload is Round {
  return _validateRound(payload) && !roundHasDuplicateCard(payload);
}

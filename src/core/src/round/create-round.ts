import { BoardState, generateBoard } from '../board';
import { createDeck } from '../deck';
import { generateHand, generateHands } from '../hand';
import { createRoundFromProps, Round } from './round';

export function createRound(
  totalHands: number,
  totalKnownHands: number,
  boardState: BoardState
): Round {
  const deck = createDeck();
  const myHand = generateHand(deck);
  const opponentsHands = generateHands(totalHands - 1, totalKnownHands, deck);
  const board = generateBoard(boardState, deck);
  return createRoundFromProps({ board, myHand, opponentsHands });
}

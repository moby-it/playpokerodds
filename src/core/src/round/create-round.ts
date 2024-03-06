import { BoardState } from '../board/boardState.ts';
import { generateBoard } from '../board/generateBoard.ts';
import { createDeck } from '../deck/createDeck.ts';
import { generateHand, generateHands } from '../hand/generateHand.ts';
import { Round } from './round.ts';

export function createRound(
  totalHands: number,
  totalKnownHands: number,
  boardState: BoardState
): Round {
  const deck = createDeck();
  const myHand = generateHand(deck);
  const opponentsHands = generateHands(totalHands - 1, totalKnownHands, deck);
  const board = generateBoard(boardState, deck);
  return { board, myHand, opponentsHands };
}

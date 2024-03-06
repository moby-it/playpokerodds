import { generateCardAndRemoveFromDeck } from '../card/generateCard.ts';
import { Deck } from '../deck/deck.ts';
import { range } from '../helpers/range.ts';
import { Board } from './board.ts';
import { BoardState, openBoardCardsFromState } from './boardState.ts';

export function generateBoard(boardState: BoardState, deck: Deck): Board {
  if (boardState == BoardState.PreFlop) return [];
  return range(1, openBoardCardsFromState(boardState)).map(() =>
    generateCardAndRemoveFromDeck(deck)
  );
}

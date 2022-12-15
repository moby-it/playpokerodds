import { generateCardAndRemoveFromDeck } from '../card';
import { Deck } from '../deck';
import { range } from '../helpers';
import { Board } from './board';
import { BoardState, openBoardCardsFromState } from './boardState';

export function generateBoard(boardState: BoardState, deck: Deck): Board {
  if (boardState == BoardState.PreFlop) return [];
  return range(1, openBoardCardsFromState(boardState)).map(() =>
    generateCardAndRemoveFromDeck(deck)
  );
}

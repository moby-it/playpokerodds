import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { map, range } from 'fp-ts/lib/NonEmptyArray';
import { generateCardAndRemoveFromDeck } from '../card';
import { Deck } from '../deck';
import { Board } from './board';
import { BoardState, openBoardCardsFromState } from './boardState';
export const generateBoard = (boardState: BoardState) => (deck: Deck) =>
  boardState === BoardState.PreFlop
    ? []
    : pipe(
        range(1, pipe(boardState, openBoardCardsFromState)),
        map(() => pipe(deck, generateCardAndRemoveFromDeck)),
        Board.decode,
        E.fold(
          () => [] as Board,
          a => a
        )
      );

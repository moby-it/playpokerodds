import { pipe } from 'fp-ts/function';
import { bind, Do, map, of } from 'fp-ts/IO';
import { generateBoard } from '../board';
import { createDeck } from '../deck';
import { generateHand, generateHands } from '../hand';
import { createRoundFromProps, Round } from './round';
import { RoundInput } from './round-input';

export const createRound: ({
  totalHands,
  totalKnownHands,
  boardState,
}: RoundInput) => Round = ({ totalHands, totalKnownHands, boardState }) =>
  pipe(
    Do,
    bind('deck', () => createDeck),
    bind('myHand', ({ deck }) => pipe(deck, generateHand, of)),
    bind('opponentsHands', ({ deck }) =>
      pipe(
        deck,
        generateHands({
          totalHands: Number(totalHands - 1),
          totalKnownHands: Number(totalKnownHands),
        }),
        of
      )
    ),
    bind('board', ({ deck }) =>
      pipe(deck, generateBoard(Number(boardState)), of)
    ),
    map(props => createRoundFromProps(props))
  )();

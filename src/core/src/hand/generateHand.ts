import { pipe } from 'fp-ts/lib/function';
import { map, NonEmptyArray, range } from 'fp-ts/lib/NonEmptyArray';
import { generateCards } from '../card';
import { Deck } from '../deck';
import { Hand, UnknownHand } from './hand';

export const generateHand = generateCards(2) as (deck: Deck) => Hand;
export const generateUnknownHand = () => UnknownHand;
export const generateHands =
  ({
    totalHands,
    totalKnownHands,
  }: {
    totalHands: number;
    totalKnownHands: number;
  }) =>
  (deck: Deck): NonEmptyArray<Hand> =>
    pipe(
      range(1, totalHands),
      map((index) =>
        index <= totalKnownHands ? generateHand(deck) : generateUnknownHand()
      )
    );

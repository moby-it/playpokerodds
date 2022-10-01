import { pipe } from 'fp-ts/lib/function';
import { map, NonEmptyArray, range } from 'fp-ts/lib/NonEmptyArray';
import { Deck } from '../deck';
import { Card } from './card';
export const generateCardAndRemoveFromDeck = (deck: Deck): Card => {
  const randomIndex = Math.floor(Math.random() * deck.length);
  const card = deck[randomIndex];
  deck.splice(randomIndex, 1);
  return card;
};
export const generateCards =
  (numberOfCards: number) =>
  (deck: Deck): NonEmptyArray<Card> =>
    pipe(
      range(1, numberOfCards),
      map(() => generateCardAndRemoveFromDeck(deck))
    );

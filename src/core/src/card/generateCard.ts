import { Deck } from '../deck/deck.ts';
import { range } from '../helpers/range.ts';
import { Card } from './card.ts';
export const generateCardAndRemoveFromDeck = (deck: Deck): Card => {
  const randomIndex = Math.floor(Math.random() * deck.length);
  const card = deck[randomIndex];
  deck.splice(randomIndex, 1);
  return card;
};
export function generateCards(deck: Deck, numberOfCards: number): Card[] {
  return range(1, numberOfCards).map(() => generateCardAndRemoveFromDeck(deck));
}

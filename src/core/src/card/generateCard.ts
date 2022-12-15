import { Deck } from '../deck';
import { range } from '../helpers';
import { Card } from './card';
export const generateCardAndRemoveFromDeck = (deck: Deck): Card => {
  const randomIndex = Math.floor(Math.random() * deck.length);
  const card = deck[randomIndex];
  deck.splice(randomIndex, 1);
  return card;
};
export function generateCards(deck: Deck, numberOfCards: number): Card[] {
  return range(1, numberOfCards).map(() => generateCardAndRemoveFromDeck(deck));
}

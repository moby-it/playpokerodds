import { generateCards } from '../card';
import { Deck } from '../deck';
import { range } from '../helpers';
import { Hand, UnknownHand } from './hand';

export const generateHand = (deck: Deck) => generateCards(deck, 2) as Hand;
export const generateUnknownHand = () => UnknownHand;
export function generateHands(
  totalHands: number,
  totalKnownHands: number,
  deck: Deck
): Hand[] {
  return range(1, totalHands).map((index) =>
    index <= totalKnownHands ? generateHand(deck) : generateUnknownHand()
  );
}

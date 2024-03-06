import { generateCards } from '../card/generateCard.ts';
import { Deck } from '../deck/deck.ts';
import { range } from '../helpers/range.ts';
import { Hand, UnknownHand } from './hand.ts';

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

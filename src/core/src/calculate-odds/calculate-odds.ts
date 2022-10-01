import { pipe } from 'fp-ts/lib/function';
import { calculateEquity, Equity } from 'poker-odds';
import { Round } from '../round';

const roundToDecimalPlaces = (decimanPlaces: number) => (num: number) =>
  +num.toFixed(decimanPlaces);

const convertDecimalToPercentage = (number: number) => number * 100;

const calculateOddsForEquity: (equity: Equity) => number = (equity: Equity) =>
  pipe(
    equity.wins / equity.count,
    convertDecimalToPercentage,
    roundToDecimalPlaces(2)
  );

export function calculateOdds({
  round: { myHand, opponentsHands, board },
}: {
  round: Round;
}): number {
  return pipe(
    calculateEquity([myHand, ...opponentsHands], board),
    (equities) => equities[0],
    calculateOddsForEquity
  );
}

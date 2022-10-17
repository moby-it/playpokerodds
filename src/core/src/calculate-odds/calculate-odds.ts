import { Round } from '../round';

import { Calculator, Input } from './calculator';

const transformRoundToInput = (round: Round): Input => {
  const hands = [
    round.myHand.join(','),
    ...round.opponentsHands
      .map((h) => h.join())
      .filter((flattenHand) => flattenHand !== '....')
  ].filter(Boolean);
  return {
    board: round.board.join(','),
    boardSize: !round.board.length ? 5 : round.board.length,
    hands,
    numPlayers: round.opponentsHands.length + 1,
    iterations: 100000,
  };
};
export function calculateOdds(round: Round): number {
  const input = transformRoundToInput(round);
  const calculator = new Calculator(input);
  const results = calculator.simulate();
  return results[round.myHand.join(',')].winPercent as number;
}

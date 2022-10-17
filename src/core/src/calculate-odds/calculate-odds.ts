import { Round } from '../round';

import { Calculator, Input } from './calculator';

const transformRoundToInput = (round: Round): Input => {
  const input: Input = {};
  input.hands = [
    round.myHand.join(','),
    ...round.opponentsHands
      .map((h) => h.join(','))
      .filter((flattenHand) => flattenHand !== '..,..'),
  ];
  if (round.board.length) {
    input.board = round.board.join(',');
    input.boardSize = round.board.length;
  }
  input.numPlayers = round.opponentsHands.length + 1;
  input.iterations = 100_000;
  return input;
};
export function calculateOdds(round: Round): number {
  const input = transformRoundToInput(round);
  const calculator = new Calculator(input);
  const results = calculator.simulate();
  return results[round.myHand.join(',')].winPercent as number;
}

import { pipe } from 'fp-ts/lib/function';
import { Hand } from '../hand';
import { createRoundFromProps } from '../round';
import { calculateOdds } from './calculate-odds';
describe('test calculate odds', () => {
  test('should always return a 4 fraction number', () => {
    const myHand: Hand = ['Ac', 'Ad'];
    const opponentsHands: Hand[] = [['2c', '2d']];
    const round = createRoundFromProps({ myHand, opponentsHands, board: [] });
    pipe;
    pipe(round, calculateOdds, (equity) =>
      expect(equity.toString()).toHaveLength(5) // dot counts
    );
  });
  test('should expect aces to win over deuces for about than 82.5% of the time', () => {
    const myHand: Hand = ['Ac', 'Ad'];
    const opponentsHands: Hand[] = [['2c', '2d']];
    const round = createRoundFromProps({ myHand, opponentsHands, board: [] });
    pipe(round, calculateOdds, (equity) => expect(equity).toBeCloseTo(82.5, 0));
  });
  test('should expect Ace-King to win over Deuces for about than 47.4% of the time', () => {
    const myHand: Hand = ['Ac', 'Kd'];
    const opponentsHands: Hand[] = [['2c', '2d']];
    const round = createRoundFromProps({ myHand, opponentsHands, board: [] });
    pipe(round, calculateOdds, (equity) => expect(equity).toBeCloseTo(47.4, 0));
  });
  test('should expect Ace-King to win over random hand for about 64.4% of the time', () => {
    const myHand: Hand = ['Ac', 'Kd'];
    const opponentsHands: Hand[] = [['..', '..']];
    const round = createRoundFromProps({ myHand, opponentsHands, board: [] });
    pipe(round, calculateOdds, (equity) => expect(equity).toBeCloseTo(64.4, 0));
  });
});

import { Board } from '../board';
import { Hand } from '../hand';
import { calculateOdds } from './calculate-odds';
describe('test calculate odds for 30_000 iterations', () => {
  test('should always return a 4 fraction number', () => {
    const myHand: Hand = ['Ac', 'Ad'];
    const opponentsHands: Hand[] = [['2c', '2d']];
    const round = { myHand, opponentsHands, board: [] };
    const odds = calculateOdds(round, 30_000);
    expect(odds.toString().length).toBeGreaterThanOrEqual(4);
  });
  test('should expect aces to win over deuces for about than 82.5% of the time', () => {
    const myHand: Hand = ['Ac', 'Ad'];
    const opponentsHands: Hand[] = [['2c', '2d']];
    const round = { myHand, opponentsHands, board: [] };
    const odds = calculateOdds(round, 30_000);
    expect(odds).toBeCloseTo(82.5, 0);
  });
  test('should expect Ace-King to win over Deuces for about than 47.4% of the time', () => {
    const myHand: Hand = ['Ac', 'Kd'];
    const opponentsHands: Hand[] = [['2c', '2d']];
    const round = { myHand, opponentsHands, board: [] };
    const odds = calculateOdds(round, 30_000);
    expect(odds).toBeCloseTo(47.4, 0);
  });
  test('should expect Ace-King to win over random hand for about 64.4% of the time', () => {
    const myHand: Hand = ['Ac', 'Kd'];
    const opponentsHands: Hand[] = [['..', '..']];
    const round = { myHand, opponentsHands, board: [] };
    const odds = calculateOdds(round, 30_000);
    expect(odds).toBeCloseTo(64.4, 0);
  });
  test('should expect Deuce-Three offsuit with a prefixed board to win over random hand for about 21.7% of the time', () => {
    const myHand: Hand = ['2d', '3c'];
    const opponentsHands: Hand[] = [['..', '..']];
    const board: Board = ['5s', 'Ts', '4d', 'Kh'];
    const round = { myHand, opponentsHands, board };
    const odds = calculateOdds(round, 30_000);
    expect(odds).toBeCloseTo(21.7, 0);
  });
});

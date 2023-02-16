import { Board } from '../board';
import { Hand } from '../hand';
import { calculateOdds } from './calculate-odds';
describe('test calculate odds ', () => {
  const iterations = 30_000;
  test('should always return a 4 fraction number', () => {
    const myHand: Hand = ['Ac', 'Ad'];
    const opponentsHands: Hand[] = [['2c', '2d']];
    const round = { myHand, opponentsHands, board: [] };
    const odds = calculateOdds(round, iterations);
    expect(odds.toString().length).toBeGreaterThanOrEqual(4);
  });
  test('should expect aces to win over deuces for about than 82.5% of the time', () => {
    const myHand: Hand = ['Ac', 'Ad'];
    const opponentsHands: Hand[] = [['2c', '2d']];
    const round = { myHand, opponentsHands, board: [] };
    const odds = calculateOdds(round, iterations);
    expect(odds).toBeCloseTo(81.95);
  });
  test('should expect Ace-King to win over Deuces for about than 47.4% of the time', () => {
    const myHand: Hand = ['Ac', 'Kd'];
    const opponentsHands: Hand[] = [['2c', '2d']];
    const round = { myHand, opponentsHands, board: [] };
    const odds = calculateOdds(round, iterations);
    expect(odds).toBeCloseTo(47.04);
  });
  test('should expect Ace-King to win over random hand for about 64.4% of the time', () => {
    const myHand: Hand = ['Ac', 'Kd'];
    const opponentsHands: Hand[] = [['..', '..']];
    const round = { myHand, opponentsHands, board: [] };
    const odds = calculateOdds(round, iterations);
    expect(odds).toBeCloseTo(64.4);
  });
  test('should expect Deuce-Three offsuit with a prefixed board to win over random hand for about 21.7% of the time', () => {
    const myHand: Hand = ['2d', '3c'];
    const opponentsHands: Hand[] = [['..', '..']];
    const board: Board = ['5s', 'Ts', '4d', 'Kh'];
    const round = { myHand, opponentsHands, board };
    const odds = calculateOdds(round, iterations);
    expect(odds).toBeCloseTo(21.7);
  });
  test('should expect a hand with 6/44 to win exactly 13.64% of the time', () => {
    const myHand: Hand = ['Qc', '4c'];
    const opponentsHands: Hand[] = [['3d', '2h']];
    const board: Board = ['9d', '5s', '7s', '2s'];
    const round = { myHand, opponentsHands, board };
    const odds = calculateOdds(round, iterations);
    expect(odds).toBeCloseTo(13.64);
  });
  test('should expect a hand with 6/44 to win exactly 13.64% of the time', () => {
    const myHand: Hand = ['Qs', '4c'];
    const opponentsHands: Hand[] = [['8c', 'Ks']];
    const board: Board = ['Th', '6d', 'Js', '2c'];
    const round = { myHand, opponentsHands, board };
    const odds = calculateOdds(round, iterations);
    expect(odds).toBeCloseTo(13.64);
  });
});

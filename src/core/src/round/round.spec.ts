import { validateRound } from './round';

describe('test round validator', () => {
  it('should consider round invalid ', () => {
    const round = {
      boardState: 5,
      myHand: ['Ac', 'Kd'],
      opponentsHands: [['..', '..']],
    };
    expect(validateRound(round)).toBeFalsy();
  });
  it('should consider round invalid ', () => {
    const round = {
      boardState: 3,
      myHand: ['Ac', 'Kd', '3c'],
      opponentsHands: [['..', '..']],
    };
    expect(validateRound(round)).toBeFalsy();
  });
  it('should consider round invalid ', () => {
    const round = {
      boardState: 2,
      myHand: ['Ac', 'Kd'],
      opponentsHands: [['fasolaki', '..']],
    };
    expect(validateRound(round)).toBeFalsy();
  });
  it('should consider round invalid ', () => {
    const round = {
      boardState: 2,
      myHand: ['Ac', 'Kd'],
    };
    expect(validateRound(round)).toBeFalsy();
  });
  it('should consider round invalid ', () => {
    const round = {
      boardState: 2,
      myHand: ['Ac', 'Kd'],
      opponentsHands: [],
    };
    expect(validateRound(round)).toBeFalsy();
  });
  it('should consider round valid ', () => {
    const round = {
      boardState: 2,
      myHand: ['Ac', 'Kd'],
      opponentsHands: [
        ['..', '..'],
        ['..', '..'],
        ['5s', 'Ad'],
      ],
    };
    expect(validateRound(round)).toBeTruthy();
  });
});

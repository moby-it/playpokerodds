import { validateRound } from './round';

describe('test round validator', () => {
  it('should consider round invalid ', () => {
    const round = {
      board: ['Ac', 'Kd'],
      myHand: ['Ac', 'Kd'],
      opponentsHands: [['..', '..']],
    };
    expect(validateRound(round)).toBeFalsy();
  });
  it('should consider round invalid ', () => {
    const round = {
      board: [],
      myHand: ['Ac', 'Kd', '3c'],
      opponentsHands: [['..', '..']],
    };
    expect(validateRound(round)).toBeFalsy();
  });
  it('should consider round invalid ', () => {
    const round = {
      board: [],
      myHand: ['Ac', 'Kd'],
      opponentsHands: [['fasolaki', '..']],
    };
    expect(validateRound(round)).toBeFalsy();
  });
  it('should consider round invalid ', () => {
    const round = {
      board: [],
      myHand: ['Ac', 'Kd'],
    };
    expect(validateRound(round)).toBeFalsy();
  });
  it('should consider round invalid ', () => {
    const round = {
      board: ['Ac', '2d', '3h'],
      myHand: ['Ac', 'Kd'],
      opponentsHands: [],
    };
    expect(validateRound(round)).toBeFalsy();
  });
  it('should consider round valid ', () => {
    const round = {
      board: ['Ah', '2d', '3h'],
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

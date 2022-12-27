import { validateBoardState } from './boardState';

describe('board test suite', () => {
  it('should test consider boardState 4 invalid', () => {
    expect(validateBoardState(4)).toBeFalsy();
  });
  it('should test consider boardState 4 invalid', () => {
    expect(validateBoardState(4)).toBeFalsy();
  });
  it('should test consider boardState -1 invalid', () => {
    expect(validateBoardState(-1)).toBeFalsy();
  });
  it('should test consider boardState "3" invalid', () => {
    expect(validateBoardState('3')).toBeFalsy();
  });
  it('should test consider boardState 0 valid', () => {
    expect(validateBoardState(0)).toBeTruthy();
  });
  it('should test consider boardState 1 valid', () => {
    expect(validateBoardState(1)).toBeTruthy();
  });
  it('should test consider boardState 2 valid', () => {
    expect(validateBoardState(2)).toBeTruthy();
  });
  it('should test consider boardState 3 valid', () => {
    expect(validateBoardState(3)).toBeTruthy();
  });
});

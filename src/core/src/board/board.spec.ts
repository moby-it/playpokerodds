import { validateBoard } from './board';

describe('board test suite', () => {
  it('should test invalid boards', () => {
    expect(validateBoard(['Bc', 2, false])).toBeFalsy();
    expect(validateBoard({})).toBeFalsy();
    expect(validateBoard(false)).toBeFalsy();
    expect(validateBoard(['Qc', 'Qs', 'Td', 'As', '3d', '2s'])).toBeFalsy();
  });

  it('should test valid boards', () => {
    expect(validateBoard([])).toBeTruthy();
    expect(validateBoard(['Ac', '3s', 'Th'])).toBeTruthy();
    expect(validateBoard(['Qc', 'Qs', 'Td', 'As'])).toBeTruthy();
    expect(validateBoard(['Qc', 'Qs', 'Td', 'As', '3d'])).toBeTruthy();
  });
});

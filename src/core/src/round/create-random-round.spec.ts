import { isRight } from 'fp-ts/lib/Either';
import { createRandomRound } from './create-random-round';
import { Round } from './round';

describe('test random round creator', () => {
  it('should create a valid random round', () => {
    for (let i = 0; i < 200; i++) {
      const round = createRandomRound();
      const isValidRound = isRight(Round.decode(round));
      expect(isValidRound).toBeTruthy();
    }
  });
});

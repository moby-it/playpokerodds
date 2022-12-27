import { validateCard } from './card';

describe('test card validator', () => {
  it('should test card validator with invalid cards', () => {
    expect(validateCard('15A')).toBeFalsy();
    expect(validateCard('10A')).toBeFalsy();
    expect(validateCard(['KS', 'KD'])).toBeFalsy();
    expect(validateCard({})).toBeFalsy();
    expect(validateCard(7)).toBeFalsy();
    expect(validateCard('10s')).toBeFalsy();
  });

  it('should test card validator with valid cards', () => {
    expect(validateCard('7d')).toBeTruthy();
    expect(validateCard('Ts')).toBeTruthy();
    expect(validateCard('3s')).toBeTruthy();
    expect(validateCard('7h')).toBeTruthy();
    expect(validateCard('5s')).toBeTruthy();
    expect(validateCard('Qc')).toBeTruthy();
  });
});

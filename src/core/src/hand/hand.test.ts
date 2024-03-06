import { assert } from 'https://deno.land/std@0.217.0/assert/assert.ts';
import { assertFalse } from 'https://deno.land/std@0.217.0/assert/assert_false.ts';
import { validateHand } from './hand.ts';

Deno.test('should test invalid hands', () => {
  const hands = [
    ['15A', '2s'],
    ['', ''],
    [1, 2],
    {},
    false,
    ['2cKh'],
    ['2h', '2h'],
  ];
  hands.forEach((h) => assertFalse(validateHand(h)));
});
Deno.test('should test valid hands', () => {
  const hands = [
    ['Td', '2s'],
    ['Td', 'Ks'],
    ['6h', '6d'],
    ['2c', 'Kh'],
  ];
  hands.forEach((h) => assert(validateHand(h)));
});
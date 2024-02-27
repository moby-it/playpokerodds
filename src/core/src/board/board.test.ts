import { assert } from 'https://deno.land/std@0.217.0/assert/assert.ts';
import { validateBoard } from './board.ts';

Deno.test("should test invalid boards", () => {
  assert(validateBoard(['Bc', 2, false]) === false);
  assert(validateBoard({}) === false);
  assert(validateBoard(false) === false); ``;
  assert(validateBoard(['Qc', 'Qs', 'Td', 'As', '3d', '2s']) === false);
});
Deno.test('should test valid boards', ()=> {
  assert(validateBoard([]));
  assert(validateBoard(['Ac', '3s', 'Th']));
  assert(validateBoard(['Qc', 'Qs', 'Td', 'As']));
  assert(validateBoard(['Qc', 'Qs', 'Td', 'As', '3d']));
})


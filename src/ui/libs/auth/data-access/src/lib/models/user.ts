import * as t from 'io-ts';
export const User = t.type({
  id: t.string,
  username: t.string,
  score: t.number,
});
export type User = t.TypeOf<typeof User>;

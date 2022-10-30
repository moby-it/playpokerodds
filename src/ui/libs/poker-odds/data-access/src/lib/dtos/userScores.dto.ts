import * as t from 'io-ts';
export const UserScore = t.type({
  username: t.string,
  score: t.string,
});
export const UserScores = t.array(UserScore);
export type UserScore = t.TypeOf<typeof UserScore>;
export type UserScores = t.TypeOf<typeof UserScores>;

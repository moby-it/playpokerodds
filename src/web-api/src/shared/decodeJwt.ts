import * as t from 'io-ts';
export const DecodedJwt = t.type({
  userId: t.string,
  email: t.string,
  role: t.number,
});
export type DecodedJwt = t.TypeOf<typeof DecodedJwt>;

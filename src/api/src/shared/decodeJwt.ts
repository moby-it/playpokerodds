import * as t from 'io-ts';
export const DecodedJwt = t.type({ userId: t.string, email: t.string });
export type DecodedJwt = t.TypeOf<typeof DecodedJwt>;

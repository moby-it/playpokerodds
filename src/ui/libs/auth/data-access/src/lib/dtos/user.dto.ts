import * as t from 'io-ts';

export const AuthDto = t.type({
  username: t.string,
  password: t.string,
});
export type AuthDto = t.TypeOf<typeof AuthDto>;
export const UserResposeDto = t.type({
  id: t.string,
  username: t.string,
  score: t.number,
  token: t.string,
});
export type UserResposeDto = t.TypeOf<typeof UserResposeDto>;

import * as t from 'io-ts';
export const SigninDto = t.type({
  email: t.string,
  password: t.string,
});
export const RegisterDto = t.type({
  email: t.string,
  username: t.string,
  password: t.string,
});
export type RegisterDto = t.TypeOf<typeof RegisterDto>;
export const AuthResposeDto = t.type({
  id: t.string,
  username: t.string,
  email: t.string,
  score: t.number,
  token: t.string,
});

export const UserResposeDto = t.type({
  id: t.string,
  username: t.string,
  email: t.string,
  score: t.number,
});

export const EditUserDto = t.type({
  username: t.string,
});

export type SigninDto = t.TypeOf<typeof SigninDto>;

export type UserResposeDto = t.TypeOf<typeof UserResposeDto>;

export type EditUserDto = t.TypeOf<typeof EditUserDto>;
export type AuthResposeDto = t.TypeOf<typeof AuthResposeDto>;

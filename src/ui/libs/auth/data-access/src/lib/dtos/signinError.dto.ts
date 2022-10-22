import * as t from 'io-ts';
export const SigninErrorDto = t.type({
  code: t.string,
  meta: t.type({
    target: t.array(t.string),
  }),
});
export type SigninErrorDto = t.TypeOf<typeof SigninErrorDto>;

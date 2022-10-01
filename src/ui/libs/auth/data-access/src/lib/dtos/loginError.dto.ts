import * as t from 'io-ts';
export const LoginErrorDto = t.type({
  code: t.string,
  meta: t.type({
    target: t.array(t.string),
  }),
});
export type LoginErrorDto = t.TypeOf<typeof LoginErrorDto>;

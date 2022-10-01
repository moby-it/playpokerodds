import * as t from 'io-ts';


export const RegisterErrorDto = t.type({
  code: t.string,
  meta: t.type({
    target: t.array(t.string),
  }),
});
export type RegisterErrorDto = t.TypeOf<typeof RegisterErrorDto>;

import * as t from 'io-ts';
export const ExistingAnswerDto = t.type({
  roundId: t.string,
  estimate: t.number,
});
export type ExistingAnswerDto = t.TypeOf<typeof ExistingAnswerDto>;

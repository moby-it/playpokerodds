import * as t from 'io-ts';
import { Round } from './round';
export const RoundAnswerDto = t.type({
  round: Round,
  odds: t.number,
  estimate: t.number,
  score: t.number,
});

export type RoundAnswerDto = t.TypeOf<typeof RoundAnswerDto>;

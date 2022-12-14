import { Round } from '@moby-it/ppo-core';
import * as t from 'io-ts';
export const NewAnswerDto = t.type({
  round: Round,
  estimate: t.number,
});
export type NewAnswerDto = t.TypeOf<typeof NewAnswerDto>;

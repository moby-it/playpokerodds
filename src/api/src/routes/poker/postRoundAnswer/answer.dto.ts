import { Round } from '@moby-it/ppo-core';
import * as t from 'io-ts';
export const PostAnswerDto = t.type({
  round: Round,
  estimate: t.number,
});
export type PostAnswerDto = t.TypeOf<typeof PostAnswerDto>;

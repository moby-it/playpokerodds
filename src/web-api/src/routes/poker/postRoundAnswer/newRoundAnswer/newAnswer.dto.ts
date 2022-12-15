import { Round } from '@moby-it/ppo-core';

export interface NewAnswerDto {
  round: Round;
  estimate: number;
}

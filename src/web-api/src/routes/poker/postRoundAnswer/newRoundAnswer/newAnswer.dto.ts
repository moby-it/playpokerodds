import { Round } from '@moby-it/poker-core';

export interface NewAnswerDto {
  round: Round;
  estimate: number;
}

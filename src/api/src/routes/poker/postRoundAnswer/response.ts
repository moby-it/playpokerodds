import { Round } from '@moby-it/poker-core';

export interface PostAnswerResponse {
  round: Round;
  odds: number;
  estimate: number;
  score: number;
}

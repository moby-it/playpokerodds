import { Round } from '@moby-it/poker-core';

export interface RoundAnswerResponse {
  roundId: string;
  round: Round;
  odds: number;
  estimate: number;
  score: number;
}

import { Round } from '@moby-it/poker-core';

export interface RoundAnswer {
  roundId: string;
  round: Round;
  odds: number;
  estimate: number;
  score: number;
  timestamp: string;
}

import { Round } from '@moby-it/ppo-core';

export interface RoundAnswer {
  roundId: string;
  round: Round;
  odds: number;
  estimate: number;
  score: number;
}

import { Round } from '@moby-it/ppo-core';

export interface RoundAnswer {
  id: string;
  round: Round;
  odds: number;
  estimate: number;
  score: number;
}

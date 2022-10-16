import { Round } from '@moby-it/ppo-core';

export interface SaveRoundDto {
  round: Round;
  userId: string;
  estimate: number;
  odds: number;
}

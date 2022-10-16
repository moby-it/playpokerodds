import { Round } from '@moby-it/ppo-core';

export interface User {
  id: string;
  email: string;
  username: string;
  score: number;
}
export type UserWithRound = User & { rounds: Round[] };

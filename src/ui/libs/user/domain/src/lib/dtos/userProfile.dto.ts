import { RoundAnswer } from '@ppo/game/domain';

export interface UserProfile {
  username: string;
  rank: number;
  score: string;
  rounds: RoundAnswer[];
}

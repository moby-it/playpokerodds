import { Round } from '@moby-it/poker-core';
import { RoundAnswer } from '@ppo/round/domain';

export interface UserProfile {
  username: string;
  rank: number;
  score: string;
  rounds: UserRound[];
  roundFavoritesIds: string[];
}
export type UserRound = Round &
  Pick<RoundAnswer, 'estimate' | 'odds' | 'roundId' | 'timestamp'> & {
    score: number;
  };
export type UserRoundViewmodel = UserRound & { isFavorite: boolean };

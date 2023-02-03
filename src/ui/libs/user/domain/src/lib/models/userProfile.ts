import { Round } from '@moby-it/ppo-core';
import { RoundAnswer } from '@ppo/game/domain';

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

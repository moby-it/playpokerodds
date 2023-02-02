import { createFeature, createReducer, on } from '@ngrx/store';
import { RoundAnswer } from '@ppo/game/domain';
import { userProfileActions } from './actions';

export interface UserProfileState {
  error: string;
  rank: number;
  username: string;
  score: number;
  roundAnswers: RoundAnswer[];
  roundFavoriteIds: string[];
}
const initialState: UserProfileState = {
  username: '',
  score: 0,
  rank: -1,
  roundAnswers: [],
  error: '',
  roundFavoriteIds: [],
};
export const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.reset, () => ({ ...initialState })),
    on(userProfileActions.setError, (state, action) => ({
      ...state,
      error: action.message,
    })),
    on(userProfileActions.setUserProfile, (state, { userProfile }) => ({
      ...state,
      roundAnswers: userProfile.rounds,
      score: Number(userProfile.score),
      username: userProfile.username,
      rank: userProfile.rank,
      roundFavoriteIds: userProfile.roundFavoritesIds,
      error: '',
    }))
  ),
});

export const { selectUserProfileState } = userProfileFeature;

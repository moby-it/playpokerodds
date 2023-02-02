import { createFeature, createReducer, on } from '@ngrx/store';
import { RoundAnswer } from '@ppo/game/domain';
import { userProfileActions } from './actions';

export interface UserProfileState {
  error: string;
  rank: number;
  username: string;
  score: number;
  rounds: RoundAnswer[];
}
const initialState: UserProfileState = {
  username: '',
  score: 0,
  rank: -1,
  rounds: [],
  error: '',
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
      rounds: userProfile.rounds,
      score: Number(userProfile.score),
      username: userProfile.username,
      rank: userProfile.rank,
      error: '',
    }))
  ),
});

export const { selectUserProfileState } = userProfileFeature;

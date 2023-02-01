import { createFeature, createReducer, on } from '@ngrx/store';
import { RoundAnswer } from '@ppo/game/domain';
import { userProfileActions } from './actions';

export interface UserProfileState {
  username: string;
  score: number;
  rounds: RoundAnswer[];
}
const initialState: UserProfileState = {
  username: '',
  score: 0,
  rounds: [],
};
export const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.reset, () => ({ ...initialState })),
    on(userProfileActions.setUserProfile, (state, { userProfile }) => ({
      ...state,
      rounds: userProfile.rounds,
      score: Number(userProfile.score),
      username: userProfile.username,
    }))
  ),
});

export const { selectUserProfileState } = userProfileFeature;

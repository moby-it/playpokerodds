import { User } from '../models';
import { createReducer, on, createFeature } from '@ngrx/store';
import { AuthActions } from './actions';
export const AUTH_STATE_NAME = 'auth';
export interface AuthState {
  user: User | null;
  status: Status;
  errorMessage: string;
}

export enum Status {
  UNAUTHORIZED,
  AUTHORIZED,
}
const authInitialState: AuthState = {
  status: Status.UNAUTHORIZED,
  user: null,
  errorMessage: '',
};
export const authFeature = createFeature({
  name: AUTH_STATE_NAME,
  reducer: createReducer(
    authInitialState,
    on(AuthActions.setUser, (state, action) => ({
      ...state,
      status: Status.AUTHORIZED,
      user: action.user,
    })),
    on(AuthActions.logout, (state) => ({
      ...state,
      status: Status.UNAUTHORIZED,
      user: null,
    }))
  ),
});
export const { selectUser, selectStatus } = authFeature;

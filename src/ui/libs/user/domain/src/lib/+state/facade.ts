import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { userProfileActions } from './actions';
import { selectUserProfileState } from './reducer';

@Injectable({ providedIn: 'root' })
export class UserProfileFacade {
  constructor(private store: Store) {}
  userProfile$ = this.store.select(selectUserProfileState);
  fetchUserProfileByUsername(username: string): void {
    this.store.dispatch(userProfileActions.fetchUserProfile({ username }));
  }
  reset(): void {
    this.store.dispatch(userProfileActions.reset());
  }
}

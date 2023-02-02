import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { userProfileActions } from './actions';
import {
  selectRoundFavoriteIds,
  selectRounds,
  selectUserProfileState,
  selectUsername,
} from './reducer';

@Injectable({ providedIn: 'root' })
export class UserProfileFacade {
  constructor(private store: Store) {}
  profile$ = this.store.select(selectUserProfileState);
  username$ = this.store.select(selectUsername);
  rounds$ = this.store.select(selectRounds);
  favoriteRounds$ = combineLatest([
    this.store.select(selectRounds),
    this.store.select(selectRoundFavoriteIds),
  ]).pipe(
    map(([rounds, favoriteRoundsIds]) => {
      return rounds.filter((r) => favoriteRoundsIds.includes(r.roundId));
    })
  );
  fetchUserProfileByUsername(username: string): void {
    this.store.dispatch(userProfileActions.setError({ message: '' }));
    this.store.dispatch(userProfileActions.fetchUserProfile({ username }));
  }
  reset(): void {
    this.store.dispatch(userProfileActions.reset());
  }
}

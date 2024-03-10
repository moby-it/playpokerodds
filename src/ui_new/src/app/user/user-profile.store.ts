import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, take, tap } from 'rxjs';
import { UpdateUserDto, UserRoundViewmodel } from '@app/user/models';

@Injectable({ providedIn: 'root' })
export class UserProfileFacade {
  constructor(private store: Store, private auth: AuthFacade) {}
  error$ = this.store.select(selectError);
  profile$ = this.store.select(selectUserProfileState);
  username$ = this.store.select(selectUsername);
  watchingMyOwnProfile$ = combineLatest([
    this.username$,
    this.auth.username$,
  ]).pipe(map(([u1, u2]) => !!u1 && !!u2 && u1 === u2));
  rounds$: Observable<UserRoundViewmodel[]> = combineLatest([
    this.store.select(selectRounds),
    this.store.select(selectRoundFavoriteIds),
  ]).pipe(
    map(([rounds, favoriteRoundsIds]) => {
      return rounds.map((r) => ({
        ...r,
        isFavorite: favoriteRoundsIds.includes(r.roundId),
      }));
    })
  );
  favoriteRounds$: Observable<UserRoundViewmodel[]> = this.rounds$.pipe(
    map((rounds) => rounds.filter((r) => r.isFavorite))
  );
  fetchUserProfileByUsername(username: string): void {
    this.store.dispatch(userProfileActions.setError({ message: '' }));
    this.store.dispatch(userProfileActions.fetchUserProfile({ username }));
  }
  refreshUserProfile(): void {
    this.username$
      .pipe(
        take(1),
        tap((username) => {
          this.store.dispatch(userProfileActions.setError({ message: '' }));
          this.store.dispatch(
            userProfileActions.fetchUserProfile({ username })
          );
        })
      )
      .subscribe();
  }
  updateUser(dto: Partial<UpdateUserDto>): void {
    this.store.dispatch(userProfileActions.updateUserProfile({ dto }));
  }
  reset(): void {
    this.store.dispatch(userProfileActions.reset());
  }
}

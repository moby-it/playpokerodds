import { computed, Injectable, Signal } from '@angular/core';
import { AuthStore } from '@app/auth/auth.store';
import { SignalStore } from '@app/shared/signal-store';
import { UpdateUserDto, UserRound, UserRoundViewmodel } from '@app/user/models';
import { produce } from 'immer';
import { catchError, of, take, tap } from 'rxjs';
import { UserProfileApiClient } from './user-profile.api-client';
import { HttpErrorResponse } from '@angular/common/http';

interface UserProfileState {
  error: string;
  rank: number;
  username: string;
  score: number;
  rounds: UserRound[];
  roundFavoriteIds: string[];
}
const initialState: UserProfileState = {
  username: '',
  score: 0,
  rank: -1,
  rounds: [],
  error: '',
  roundFavoriteIds: [],
};

@Injectable({ providedIn: 'root' })
export class UserProfileStore extends SignalStore<UserProfileState>{
  constructor(private authStore: AuthStore, private userProfileApiClient: UserProfileApiClient) {
    super(initialState);
  }
  error = this.select(state => state.error);
  username = this.select(state => state.username);
  watchingMyOwnProfile = computed(() => this.username() === this.authStore.username());
  profile = this.stateAsSignal;
  rounds: Signal<UserRoundViewmodel[]> = this.select(state => {
    const rounds = state.rounds;
    const favoriteRoundsIds = state.roundFavoriteIds;
    return rounds.map((r) => ({
      ...r,
      isFavorite: favoriteRoundsIds.includes(r.roundId),
    }));
  });
  favoriteRounds = computed(() => {
    return this.rounds().filter(r => r.isFavorite);
  });
  fetchUserProfileByUsername(username: string): void {
    this.setState(produce(this.state, state => ({ ...state, error: '' })));
    this.userProfileApiClient.fetchUserProfileByUsername(username).pipe(
      tap((userProfile) => this.setState(produce(this.state, state => ({
        ...state,
        rounds: userProfile.rounds,
        score: Number(userProfile.score),
        username: userProfile.username,
        rank: userProfile.rank,
        roundFavoriteIds: userProfile.roundFavoritesIds,
        error: '',
      })))),
      catchError((e: HttpErrorResponse) => {
        this.setError(e.error);
        return of(null);
      }),
    ).subscribe();
  };
  refreshUserProfile(): void {
    this.setError('');
    const username = this.username();
    this.fetchUserProfileByUsername(username);
  };
  updateUser(dto: Partial<UpdateUserDto>): void {
    this.userProfileApiClient.updateUser(dto).pipe(
      tap(() => {
        this.authStore.refresh();
      }),
      catchError(e => {
        this.setError(e.message);
        return of(null);
      })
    ).subscribe();
  };
  private setError(error: string) {
    this.setState(produce(this.state, (state) => ({ ...state, error })));
  }
}

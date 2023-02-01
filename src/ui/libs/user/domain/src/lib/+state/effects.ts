import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, repeat, switchMap } from 'rxjs';
import { UserProfileApiClient } from '../user-profile.api-client';
import { userProfileActions } from './actions';

@Injectable()
export class UserProfileEffects {
  constructor(
    private actions: Actions,
    private userProfileApiClient: UserProfileApiClient
  ) {}
  fetchUserProfileByUsername$ = createEffect(() =>
    this.actions.pipe(
      ofType(userProfileActions.fetchUserProfile),
      switchMap(({ username }) =>
        this.userProfileApiClient.fetchUserProfileByUsername(username)
      ),
      map((userProfile) => userProfileActions.setUserProfile({ userProfile })),
      catchError(() => EMPTY),
      repeat()
    )
  );
}

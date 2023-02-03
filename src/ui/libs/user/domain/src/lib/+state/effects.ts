import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { refreshTokenAction } from '@ppo/auth/domain';
import { catchError, map, of, repeat, switchMap } from 'rxjs';
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
      catchError((e: HttpErrorResponse) => {
        return of(userProfileActions.setError({ message: e.error }));
      }),
      repeat()
    )
  );
  updateUserProfile$ = createEffect(() =>
    this.actions.pipe(
      ofType(userProfileActions.updateUserProfile),
      switchMap(({ dto }) => this.userProfileApiClient.updateUser(dto)),
      switchMap(() => [
        userProfileActions.setError({ message: '' }),
        refreshTokenAction(),
      ]),
      catchError((e) =>
        of(userProfileActions.setError({ message: e.message }))
      ),
      repeat()
    )
  );
}

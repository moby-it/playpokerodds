import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BEARER_TOKEN_STORAGE_KEY } from '@ppo/shared/config';
import { catchError, EMPTY, map, mergeMap, tap } from 'rxjs';
import { AuthApiClient } from '../auth.api-client.service';
import { AuthActions } from './actions';
@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private authApiClient: AuthApiClient) {}
  signIn$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.signin),
      mergeMap((dto) =>
        this.authApiClient.login(dto).pipe(
          tap((response) => {
            localStorage.setItem(BEARER_TOKEN_STORAGE_KEY, response.token);
          }),
          map((response) => AuthActions.setUser({ user: { ...response } })),
          catchError((e: HttpErrorResponse) => EMPTY)
        )
      )
    )
  );
  register$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.register),
      mergeMap((dto) =>
        this.authApiClient.register(dto).pipe(
          tap((response) => {
            localStorage.setItem(BEARER_TOKEN_STORAGE_KEY, response.token);
          }),
          map((response) => AuthActions.setUser({ user: { ...response } })),
          catchError((e: HttpErrorResponse) => {
            console.log(e.error);
            return EMPTY;
          })
        )
      )
    )
  );
}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BEARER_TOKEN_STORAGE_KEY } from '@ppo/shared/config';
import { catchError, EMPTY, map, mergeMap, of, tap } from 'rxjs';
import { AuthApiClient } from '../auth.api-client.service';
import { AuthActions } from './actions';
@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private authApiClient: AuthApiClient) {}
  signIn$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.signin),
      mergeMap((dto) =>
        this.authApiClient.signin(dto).pipe(
          tap((response) => {
            localStorage.setItem(BEARER_TOKEN_STORAGE_KEY, response.token);
          }),
          map((response) => AuthActions.setUser({ user: { ...response } })),
          catchError((e) => {
            if (e instanceof HttpErrorResponse) {
              return of(
                AuthActions.setErrorMessage({ message: e.error?.message })
              );
            }
            return EMPTY;
          })
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
            if (e.error.code === 'P2002') {
              return of(
                AuthActions.setErrorMessage({
                  message: `${String(e.error.meta.target[0])} already exists.`,
                })
              );
            }
            return EMPTY;
          })
        )
      )
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.refresh),
      mergeMap(() =>
        this.authApiClient.refreshToken().pipe(
          tap((response) => {
            localStorage.setItem(BEARER_TOKEN_STORAGE_KEY, response.token);
          }),
          map((response) => AuthActions.setUser({ user: { ...response } })),
          catchError((e) => {
            if (e instanceof HttpErrorResponse) {
              return of(
                AuthActions.setErrorMessage({ message: e.error?.message })
              );
            }
            localStorage.clear();
            return EMPTY;
          })
        )
      )
    )
  );
}

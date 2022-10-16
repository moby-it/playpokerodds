import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BEARER_TOKEN_STORAGE_KEY } from '@ppo/shared/config';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, switchMap, tap } from 'rxjs';
import { AuthApiClient } from '../auth.api-client.service';
import { LoginErrorDto, RegisterErrorDto } from '../dtos';
import { AuthActions } from './actions';
@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private authApiClient: AuthApiClient) {}
  login$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.login),
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

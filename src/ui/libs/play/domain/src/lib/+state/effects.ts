import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Round } from '@moby-it/poker-core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import {
  catchError,
  EMPTY,
  filter,
  map,
  mergeMap,
  repeat,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { GameApiClient } from '../game.api-client.service';
import { generateRandomRoundInputs } from '../helpers';
import { pokerOddsActions } from './actions';
import {
  selectPlayWithRevealedCards,
  selectRound,
  selectRoundId,
} from './reducer';
@Injectable()
export class PokerOddsEffects {
  constructor(
    private actions: Actions,
    private pokerOddsApiClient: GameApiClient,
    private store: Store,
    private toaster: ToastrService
  ) {}
  fetchRound$ = createEffect(() =>
    this.actions.pipe(
      ofType(pokerOddsActions.startNewRound),
      withLatestFrom(this.store.select(selectPlayWithRevealedCards)),
      mergeMap(([, withRevealedCards]) =>
        withRevealedCards
          ? this.pokerOddsApiClient.fetchRound(generateRandomRoundInputs())
          : this.pokerOddsApiClient.fetchRandomRound()
      ),
      switchMap((round) => [pokerOddsActions.setCurrentRound({ round })])
    )
  );
  fetchExistingRound$ = createEffect(() => {
    let roundId = '';
    return this.actions.pipe(
      ofType(pokerOddsActions.fetchExistingRound),
      switchMap(({ id }) => {
        roundId = id;
        return this.pokerOddsApiClient.fetchRoundById(id);
      }),
      switchMap((round) => [
        pokerOddsActions.setRoundId({ id: roundId }),
        pokerOddsActions.setCurrentRound({ round }),
      ]),
      catchError((e: HttpErrorResponse) => {
        if (e.status === 404) {
          this.toaster.error('Round not found');
        }
        return EMPTY;
      }),
      repeat()
    );
  });
  postAnswer$ = createEffect(() =>
    this.actions.pipe(
      ofType(pokerOddsActions.answerRound),
      withLatestFrom(this.store.select(selectRound)),
      filter(([, round]) => Boolean(round)),
      withLatestFrom(this.store.select(selectRoundId)),
      mergeMap(([[action, round], roundId]) =>
        roundId
          ? this.pokerOddsApiClient.postExistingRoundAnswer(
              roundId,
              action.estimate
            )
          : this.pokerOddsApiClient.postNewRoundAnswer(
              round as Round,
              action.estimate
            )
      ),
      switchMap((answer) => [pokerOddsActions.setRoundAnswer({ answer })])
    )
  );

  addRoundToFavorites$ = createEffect(() =>
    this.actions.pipe(
      ofType(pokerOddsActions.addRoundToFavorites),
      switchMap(({ roundId }) =>
        this.pokerOddsApiClient.addToFavorites(roundId)
      ),
      tap(() => this.toaster.info('Round added to favorites')),
      map(() => pokerOddsActions.empty()),
      catchError(() => EMPTY),
      repeat()
    )
  );
  removeRoundToFavorites$ = createEffect(() =>
    this.actions.pipe(
      ofType(pokerOddsActions.removeRoundFromFavorites),
      switchMap(({ roundId }) =>
        this.pokerOddsApiClient.removeFromFavorites(roundId)
      ),
      map(() => pokerOddsActions.empty()),
      catchError(() => EMPTY),
      repeat()
    )
  );
}

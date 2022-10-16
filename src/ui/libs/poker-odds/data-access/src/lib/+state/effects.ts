import { Injectable } from '@angular/core';
import { Round } from '@moby-it/ppo-core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LoaderService } from '@ppo/shared/ui';
import {
  EMPTY,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { PokerOddsApiClient } from '../poker-odds.api-client.service';
import { pokerOddsActions } from './actions';
import { selectRound } from './reducer';

@Injectable()
export class PokerOddsEffects {
  constructor(
    private actions: Actions,
    private pokerOddsApiClient: PokerOddsApiClient,
    private store: Store,
    private loader: LoaderService
  ) {}
  fetchRound$ = createEffect(() =>
    this.actions.pipe(
      ofType(pokerOddsActions.startNewRound),
      tap(() =>
        this.store.dispatch(pokerOddsActions.setLoading({ loading: true }))
      ),
      mergeMap(() => this.pokerOddsApiClient.fetchRandomRound()),
      switchMap((round) => [pokerOddsActions.setCurrentRound({ round })])
    )
  );
  postAnswer$ = createEffect(() =>
    this.actions.pipe(
      ofType(pokerOddsActions.answerRound),
      withLatestFrom(this.store.select(selectRound)),
      filter(([, round]) => Boolean(round)),
      tap(() =>
        this.store.dispatch(pokerOddsActions.setLoading({ loading: true }))
      ),
      mergeMap(([action, round]) =>
        this.pokerOddsApiClient.postRoundAnswer(round as Round, action.estimate)
      ),
      switchMap((answer) => [pokerOddsActions.setRoundAnswer({ answer })])
    )
  );
}

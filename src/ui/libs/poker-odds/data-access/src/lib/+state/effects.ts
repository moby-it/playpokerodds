import { Injectable } from '@angular/core';
import { Round } from '@moby-it/ppo-core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { generateRandomRoundInputs } from '../helpers';
import { PokerOddsApiClient } from '../poker-odds.api-client.service';
import { pokerOddsActions } from './actions';
import { selectPlayWithRevealedCards, selectRound } from './reducer';

@Injectable()
export class PokerOddsEffects {
  constructor(
    private actions: Actions,
    private pokerOddsApiClient: PokerOddsApiClient,
    private store: Store
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
  postAnswer$ = createEffect(() =>
    this.actions.pipe(
      ofType(pokerOddsActions.answerRound),
      withLatestFrom(this.store.select(selectRound)),
      filter(([, round]) => Boolean(round)),
      mergeMap(([action, round]) =>
        this.pokerOddsApiClient.postNewRoundAnswer(
          round as Round,
          action.estimate
        )
      ),
      switchMap((answer) => [pokerOddsActions.setRoundAnswer({ answer })])
    )
  );
  fetchLeaderoards$ = createEffect(() =>
    this.actions.pipe(
      ofType(pokerOddsActions.fetchLeaderboards),
      switchMap(() => this.pokerOddsApiClient.fetchLeaderboards()),
      map((scores) => pokerOddsActions.setLeaderboards({ scores }))
    )
  );
}

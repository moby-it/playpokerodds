import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { pokerOddsActions } from './actions';
import {
  selectAnswer,
  selectCalculatingAnswer,
  selectFetchingLeaderboards,
  selectFetchingRound,
  selectRound,
  selectRoundStatus,
  selectUserScores,
} from './reducer';

@Injectable({ providedIn: 'root' })
export class PokerOddsFacade {
  constructor(private store: Store) {}
  // loaders
  fetchingRound$ = this.store.select(selectFetchingRound);
  calculatingAnswer$ = this.store.select(selectCalculatingAnswer);
  fetchingLeaderboards$ = this.store.select(selectFetchingLeaderboards);
  // selectors
  currentRound$ = this.store.select(selectRound);
  answer$ = this.store.select(selectAnswer);

  roundStatus$ = this.store.select(selectRoundStatus);
  userScores$ = this.store.select(selectUserScores);
  startNewRound(): void {
    this.store.dispatch(pokerOddsActions.startNewRound());
  }
  submitEstimate(estimate: number): void {
    this.store.dispatch(pokerOddsActions.answerRound({ estimate }));
  }
  refreshLeaderboards(): void {
    this.store.dispatch(pokerOddsActions.fetchLeaderboards());
  }
  reset(): void {
    this.store.dispatch(pokerOddsActions.reset());
  }
}

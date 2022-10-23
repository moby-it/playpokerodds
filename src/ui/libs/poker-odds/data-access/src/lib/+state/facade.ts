import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { pokerOddsActions } from './actions';
import {
  selectAnswer,
  selectCalculatingAnswer,
  selectFetchingRound,
  selectRound,
  selectRoundStatus
} from './reducer';

@Injectable({ providedIn: 'root' })
export class PokerOddsFacade {
  constructor(private store: Store) {}
  currentRound$ = this.store.select(selectRound);
  answer$ = this.store.select(selectAnswer);
  fetchingRound$ = this.store.select(selectFetchingRound);
  calculatingAnswer$ = this.store.select(selectCalculatingAnswer);

  roundStatus$ = this.store.select(selectRoundStatus);
  startNewRound(): void {
    this.store.dispatch(pokerOddsActions.startNewRound());
  }
  submitEstimate(estimate: number): void {
    this.store.dispatch(pokerOddsActions.answerRound({ estimate }));
  }
  reset(): void {
    this.store.dispatch(pokerOddsActions.reset());
  }
}

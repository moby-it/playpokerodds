import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { pokerOddsActions } from './actions';
import { selectAnswer, selectLoading, selectRound } from './reducer';

@Injectable({ providedIn: 'root' })
export class PokerOddsFacade {
  constructor(private store: Store) {}
  currentRound$ = this.store.select(selectRound);
  answer$ = this.store.select(selectAnswer);
  loading$ = this.store.select(selectLoading);
  startNewRound() {
    this.store.dispatch(pokerOddsActions.startNewRound());
  }
  submitEstimate(estimate: number) {
    this.store.dispatch(pokerOddsActions.answerRound({ estimate }));
  }
}

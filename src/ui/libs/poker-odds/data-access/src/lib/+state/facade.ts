import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, of, switchMap } from 'rxjs';
import { pokerOddsActions } from './actions';
import {
  selectAnswer,
  selectLoading,
  selectRound,
  selectRoundStatus,
} from './reducer';

@Injectable({ providedIn: 'root' })
export class PokerOddsFacade {
  constructor(private store: Store) {}
  currentRound$ = this.store.select(selectRound);
  answer$ = this.store.select(selectAnswer);
  loading$ = this.store
    .select(selectLoading)
    .pipe(
      switchMap((loading) => (loading ? of(true).pipe(delay(500)) : of(false)))
    );
  roundStatus$ = this.store.select(selectRoundStatus);
  startNewRound(): void {
    this.store.dispatch(pokerOddsActions.startNewRound());
  }
  submitEstimate(estimate: number): void {
    this.store.dispatch(pokerOddsActions.answerRound({ estimate }));
  }
}

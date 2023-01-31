import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { pokerOddsActions } from './actions';
import {
  selectAnswer,
  selectCalculatingAnswer,
  selectFetchingLeaderboards,
  selectFetchingRound,
  selectPlayWithRevealedCards,
  selectRound,
  selectRoundId,
  selectRoundStatus,
  selectUserScores,
} from './reducer';
import { Clipboard } from '@angular/cdk/clipboard';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class PokerOddsFacade {
  constructor(
    private store: Store,
    private clipboard: Clipboard,
    private toaster: ToastrService
  ) {}
  // loaders
  fetchingRound$ = this.store.select(selectFetchingRound);
  calculatingAnswer$ = this.store.select(selectCalculatingAnswer);
  fetchingLeaderboards$ = this.store.select(selectFetchingLeaderboards);
  // selectors
  currentRound$ = this.store.select(selectRound);
  answer$ = this.store.select(selectAnswer);

  roundStatus$ = this.store.select(selectRoundStatus);
  userScores$ = this.store.select(selectUserScores);
  playingWithRevealedCards$ = this.store.select(selectPlayWithRevealedCards);
  startNewRound(): void {
    this.store.dispatch(pokerOddsActions.startNewRound());
  }
  submitEstimate(estimate: number): void {
    this.store.dispatch(pokerOddsActions.answerRound({ estimate }));
  }
  fetchAndSetExistingRound(id: string): void {
    this.store.dispatch(pokerOddsActions.fetchExistingRound({ id }));
  }
  saveToFavorites(): void {
    this.store
      .select(selectRoundId)
      .pipe(take(1))
      .subscribe((roundId) => {
        this.store.dispatch(pokerOddsActions.addRoundToFavorites({ roundId }));
      });
  }
  copyRoundUrlToClipboard(): void {
    this.answer$.pipe(take(1)).subscribe((answer) => {
      const url = `${window.origin}/play/${answer?.roundId}`;
      this.clipboard.copy(url);
      this.toaster.info('Link copied', '', { timeOut: 2000 });
    });
  }
  togglePlayRevealedCards(): void {
    this.store.dispatch(pokerOddsActions.togglePlayWithRevealedCards());
  }
  refreshLeaderboards(): void {
    this.store.dispatch(pokerOddsActions.fetchLeaderboards());
  }
  reset(): void {
    this.store.dispatch(pokerOddsActions.reset());
  }
}

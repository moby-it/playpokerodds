import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { GameApiClient } from '../game.api-client.service';
import { pokerOddsActions } from './actions';
import {
  selectAnswer,
  selectCalculatingAnswer,
  selectFetchingRound,
  selectPlayWithRevealedCards,
  selectRound,
  selectRoundId,
  selectRoundStatus,
} from './reducer';

@Injectable({ providedIn: 'root' })
export class PokerOddsFacade {
  constructor(
    private store: Store,
    private clipboard: Clipboard,
    private toaster: ToastrService,
    private pokerApiClient: GameApiClient
  ) {}
  // loaders
  fetchingRound$ = this.store.select(selectFetchingRound);
  calculatingAnswer$ = this.store.select(selectCalculatingAnswer);
  // selectors
  currentRound$ = this.store.select(selectRound);
  answer$ = this.store.select(selectAnswer);

  roundStatus$ = this.store.select(selectRoundStatus);
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
  addRoundToFavorites(roundId: string): Observable<unknown> {
    return this.pokerApiClient.addToFavorites(roundId);
  }
  removeRoundFromFavorites(roundId: string): Observable<unknown> {
    return this.pokerApiClient.removeFromFavorites(roundId);
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
  reset(): void {
    this.store.dispatch(pokerOddsActions.reset());
  }
}

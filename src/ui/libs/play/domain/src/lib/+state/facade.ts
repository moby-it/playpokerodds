import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameApiClient } from '../game.api-client.service';
import { pokerOddsActions } from './actions';
import {
  selectAnswer,
  selectCalculatingAnswer,
  selectFetchingRound,
  selectPlayWithRevealedCards,
  selectRound,
  selectRoundStatus,
} from './reducer';
declare let gtag: (
  action: string,
  eventName: string,
  options?: unknown
) => void;
@Injectable({ providedIn: 'root' })
export class PokerOddsFacade {
  constructor(private store: Store, private pokerApiClient: GameApiClient) { }
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
    if (gtag)
      gtag('event', 'round_played');
    this.store.dispatch(pokerOddsActions.answerRound({ estimate }));
  }
  fetchAndSetExistingRound(id: string): void {
    this.store.dispatch(pokerOddsActions.fetchExistingRound({ id }));
  }
  addRoundToFavorites(roundId: string): Observable<unknown> {
    return this.pokerApiClient.addToFavorites(roundId);
  }
  removeRoundFromFavorites(roundId: string): Observable<unknown> {
    return this.pokerApiClient.removeFromFavorites(roundId);
  }
  togglePlayRevealedCards(): void {
    this.store.dispatch(pokerOddsActions.togglePlayWithRevealedCards());
  }
  reset(): void {
    this.store.dispatch(pokerOddsActions.reset());
  }
}

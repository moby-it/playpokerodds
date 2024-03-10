import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameApiClient } from './game.api-client.service';
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

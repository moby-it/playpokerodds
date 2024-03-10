import { Injectable } from '@angular/core';
import { Observable, catchError, lastValueFrom, of, repeat, tap, withLatestFrom } from 'rxjs';
import { GameApiClient } from './game.api-client.service';
import { SignalStore } from '@app/shared/signal-store';
import { RoundAnswer } from '@app/round/dtos';
import { Round } from '@moby-it/poker-core';
import { produce } from 'immer';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { generateRandomRoundInputs } from './generateRandomRoundInputs';
import { scoreIsAccurate } from '@app/round/helpers';

type RoundStatus = 'Initial' | 'Playing' | 'Completed';
type RoundAnswerWithEstimate = RoundAnswer & { didAccurateEstimate: boolean; };
interface PlayUiState {
  fetchingRound: boolean;
  calculatingAnswer: boolean;
  roundId: string;
  round: Round | null;
  estimate: number | null;
  answer: RoundAnswerWithEstimate | null;
  roundStatus: RoundStatus;
  playWithRevealedCards: boolean;
}
const initialState: PlayUiState = {
  fetchingRound: false,
  calculatingAnswer: false,
  roundId: '',
  round: null,
  estimate: null,
  answer: null,
  roundStatus: 'Initial',
  playWithRevealedCards: true,
};

@Injectable({ providedIn: 'root' })
export class PokerOddsStore extends SignalStore<PlayUiState>{
  constructor(private gameApiClient: GameApiClient, private toaster: ToastrService) {
    super(initialState);
  }
  // loaders
  fetchingRound = this.select(state => state.fetchingRound);
  calculatingAnswer = this.select(state => state.calculatingAnswer);

  // selectors
  currentRound = this.select(state => state.round);
  answer = this.select(state => state.answer);

  roundStatus = this.select(state => state.roundStatus);
  playingWithRevealedCards = this.select(state => state.playWithRevealedCards);

  startNewRound(): void {
    this.setState(produce(this.state, state => ({
      ...state,
      estimate: null,
      fetchingRound: true,
      roundId: '',
    })));
    let op$;
    if (this.playingWithRevealedCards()) {
      op$ = this.gameApiClient.fetchRound(generateRandomRoundInputs());
    } else {
      op$ = this.gameApiClient.fetchRandomRound();
    }
    op$.subscribe(round => {
      this.setState(produce(this.state, state => ({
        ...state,
        round,
        fetchingRound: false,
        roundStatus: 'Playing' as RoundStatus,
        estimate: null,
        answer: null
      })));
    });
  }
  async submitEstimate(estimate: number): Promise<void> {
    const roundId = this.state.roundId;
    this.setState(produce(this.state, state => {
      state.estimate = estimate;
      state.calculatingAnswer = true;
    }));
    let answer: RoundAnswer;
    if (roundId) {
      answer = await lastValueFrom(this.gameApiClient.postExistingRoundAnswer(
        roundId,
        estimate
      ));
    } else {
      answer = await lastValueFrom(this.gameApiClient.postNewRoundAnswer(
        this.currentRound()!,
        estimate
      ));
    }
    this.setRoundResponse(answer);
  }
  fetchAndSetExistingRound(id: string): void {
    this.gameApiClient.fetchRoundById(id).pipe(
      tap(round => {
        this.setState(produce(this.state, (state) => ({
          ...state,
          id,
          round
        })));
      }),
      catchError((e: HttpErrorResponse) => {
        if (e.status === 404) {
          this.toaster.error('Round not found');
        }
        return of(null);
      }),
      repeat()
    ).subscribe();
  }
  addRoundToFavorites(roundId: string): Observable<unknown> {
    return this.gameApiClient.addToFavorites(roundId);
  }
  removeRoundFromFavorites(roundId: string): Observable<unknown> {
    return this.gameApiClient.removeFromFavorites(roundId);
  }
  togglePlayRevealedCards(): void {
    this.setState(produce(this.state, state => ({ ...state, playWithRevealedCards: !state.playWithRevealedCards })));
  }
  private setRoundResponse(answer: RoundAnswer) {
    this.setState(produce(this.state, state => ({
      ...state,
      answer: {
        ...answer,
        didAccurateEstimate: scoreIsAccurate(answer.score),
        roundId: answer.roundId,
      },
      calculatingAnswer: false,
      roundStatus: 'Completed' as RoundStatus,
    })));
  }
}

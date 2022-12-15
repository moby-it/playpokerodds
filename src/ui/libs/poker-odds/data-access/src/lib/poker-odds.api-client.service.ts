import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Round } from '@moby-it/ppo-core';
import { API_URL } from '@ppo/shared/config';
import { delay, Observable } from 'rxjs';
import { RoundAnswer, UserScore } from './dtos';
import { RoundInputs } from './helpers';

@Injectable()
export class PokerOddsApiClient {
  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
  ) {}
  fetchRandomRound(): Observable<Round> {
    return this.http
      .get<Round>(`${this.apiUrl}/poker/FetchRandomRound`)
      .pipe(delay(1000));
  }
  fetchRound({
    boardState,
    totalHands,
    totalKnownHands,
  }: RoundInputs): Observable<Round> {
    return this.http.get<Round>(`${this.apiUrl}/poker/FetchRound`, {
      params: {
        totalHands,
        totalKnownHands,
        boardState,
      },
    });
  }
  postNewRoundAnswer(round: Round, estimate: number): Observable<RoundAnswer> {
    return this.http.post<RoundAnswer>(
      `${this.apiUrl}/poker/postNewRoundAnswer`,
      {
        round,
        estimate,
      }
    );
  }
  postExistingRoundAnswer(
    roundId: string,
    estimate: number
  ): Observable<RoundAnswer> {
    return this.http.post<RoundAnswer>(
      `${this.apiUrl}/poker/postExistingRoundAnswer`,
      {
        roundId,
        estimate,
      }
    );
  }
  fetchLeaderboards(): Observable<UserScore[]> {
    return this.http.get<UserScore[]>(`${this.apiUrl}/poker/fetchLeaderboards`);
  }
  fetchUserRounds(): Observable<RoundAnswer[]> {
    return this.http.get<RoundAnswer[]>(`${this.apiUrl}/poker/fetchUserRounds`);
  }
}

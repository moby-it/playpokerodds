import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CreateRoundInputs, Round } from '@moby-it/ppo-core';
import { API_URL } from '@ppo/shared/config';
import { Observable } from 'rxjs';
import { RoundAnswer } from '@ppo/round/domain';

@Injectable()
export class GameApiClient {
  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
  ) {}
  fetchRandomRound(): Observable<Round> {
    return this.http.get<Round>(`${this.apiUrl}/poker/FetchRandomRound`);
  }
  fetchRound({
    boardState,
    totalHands,
    totalKnownHands,
  }: CreateRoundInputs): Observable<Round> {
    return this.http.get<Round>(`${this.apiUrl}/poker/FetchRound`, {
      params: {
        totalHands,
        totalKnownHands,
        boardState,
      },
    });
  }
  fetchRoundById(roundId: string): Observable<Round> {
    return this.http.get<Round>(
      `${this.apiUrl}/poker/FetchRoundById/${roundId}`
    );
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
  addToFavorites(roundId: string): Observable<unknown> {
    return this.http.put<RoundAnswer>(
      `${this.apiUrl}/poker/addToFavorites/${roundId}`,
      {}
    );
  }
  removeFromFavorites(roundId: string): Observable<unknown> {
    return this.http.put<RoundAnswer>(
      `${this.apiUrl}/poker/removeFromFavorites/${roundId}`,
      {}
    );
  }
  fetchUserRounds(): Observable<RoundAnswer[]> {
    return this.http.get<RoundAnswer[]>(`${this.apiUrl}/poker/fetchUserRounds`);
  }
}

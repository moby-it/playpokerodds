import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Round,
  RoundAnswerDto,
  RoundInputQueryParams,
} from '@moby-it/ppo-core';
import { API_URL } from '@ppo/shared/config';
import { isLeft } from 'fp-ts/es6/Either';
import { delay, Observable, tap } from 'rxjs';
import { UserScore, UserScores } from './dtos';

@Injectable()
export class PokerOddsApiClient {
  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
  ) {}
  fetchRandomRound(): Observable<Round> {
    return this.http.get<Round>(`${this.apiUrl}/poker/FetchRandomRound`).pipe(
      delay(1000),
      tap((round) => {
        if (isLeft(Round.decode(round)))
          throw new Error('Invalid Round response');
      })
    );
  }
  fetchRound(params: RoundInputQueryParams): Observable<Round> {
    return this.http
      .get<Round>(`${this.apiUrl}/poker/FetchRound`, { params })
      .pipe(
        delay(1000),
        tap((round) => {
          if (isLeft(Round.decode(round)))
            throw new Error('Invalid Round response');
        })
      );
  }
  postRoundAnswer(round: Round, estimate: number): Observable<RoundAnswerDto> {
    return this.http
      .post<RoundAnswerDto>(`${this.apiUrl}/poker/postRoundAnswer`, {
        round,
        estimate,
      })
      .pipe(
        tap((answerDto) => {
          if (isLeft(RoundAnswerDto.decode(answerDto)))
            throw new Error('Invalid Round Answer response');
        })
      );
  }
  fetchLeaderboards(): Observable<UserScore[]> {
    return this.http
      .get<UserScores>(`${this.apiUrl}/poker/fetchLeaderboards`)
      .pipe(
        tap((scores) => {
          if (isLeft(UserScores.decode(scores)))
            throw new Error('Invalid UserScoreresponse');
        })
      );
  }
}

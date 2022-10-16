import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@ppo/shared/config';
import { Round, RoundAnswerDto } from '@moby-it/ppo-core';
import { isLeft } from 'fp-ts/es6/Either';
import { Observable, tap } from 'rxjs';

@Injectable()
export class PokerOddsApiClient {
  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
  ) {}
  fetchRandomRound(): Observable<Round> {
    return this.http.get<Round>(`${this.apiUrl}/poker/FetchRandomRound`).pipe(
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
}

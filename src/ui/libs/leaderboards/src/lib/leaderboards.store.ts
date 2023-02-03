import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@ppo/shared/config';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { UserScore } from './dtos';

@Injectable()
export class LeaderboardsStore {
  private _userScores$: BehaviorSubject<UserScore[]> = new BehaviorSubject<
    UserScore[]
  >([]);
  userScores$ = this._userScores$.asObservable();
  private _loading$ = new BehaviorSubject(false);
  loading$ = this._loading$.asObservable();
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}
  fetchLeaderboards(): Observable<UserScore[]> {
    this._loading$.next(true);
    return this.http
      .get<UserScore[]>(`${this.apiUrl}/poker/fetchLeaderboards`)
      .pipe(
        tap((userScores) => {
          this._userScores$.next(userScores);
        }),
        finalize(() => this._loading$.next(false))
      );
  }
}

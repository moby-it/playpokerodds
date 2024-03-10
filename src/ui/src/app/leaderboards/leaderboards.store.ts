import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal } from '@angular/core';
import { API_URL } from '@app/shared/config/apiUrl.token';
import { Observable, finalize, tap } from 'rxjs';
import { UserScore } from './userScores.dto';

@Injectable({ providedIn: 'root' })
export class LeaderboardsStore {
  #userScores = signal<UserScore[]>([]);
  get userScores() {
    return this.#userScores.asReadonly();
  }
  loading = signal(false);
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) { }
  fetchLeaderboards(): Observable<UserScore[]> {
    this.loading.set(true);
    return this.http
      .get<UserScore[]>(`${this.apiUrl}/poker/fetchLeaderboards`)
      .pipe(
        tap((userScores) => {
          this.#userScores.set(userScores);
        }),
        finalize(() => this.loading.set(false))
      );
  }
}

import { Injectable } from '@angular/core';

import { Observable, skipWhile } from 'rxjs';
import { LeaderboardsStore } from './leaderboards.store';

@Injectable({ providedIn: 'root' })
export class LeaderboardsResolver {
  constructor(private leaderboardStore: LeaderboardsStore) { }
  resolve(): Observable<unknown> {
    return this.leaderboardStore
      .fetchLeaderboards()
      .pipe(skipWhile((loading) => !loading));
  }
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, skipWhile } from 'rxjs';
import { LeaderboardsStore } from './leaderboards.store';

@Injectable()
export class LeaderboardsResolver implements Resolve<unknown> {
  constructor(private leaderboardStore: LeaderboardsStore) {}
  resolve(): Observable<unknown> {
    return this.leaderboardStore
      .fetchLeaderboards()
      .pipe(skipWhile((loading) => !loading));
  }
}

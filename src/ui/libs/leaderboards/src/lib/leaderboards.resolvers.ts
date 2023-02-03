import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LoaderService } from '@ppo/shared/ui';
import { map, Observable, skipWhile } from 'rxjs';
import { LeaderboardsStore } from './leaderboards.store';

@Injectable()
export class LeaderboardsResolver implements Resolve<void> {
  constructor(
    private leaderboardStore: LeaderboardsStore,
    private loader: LoaderService
  ) {}
  resolve(): Observable<void> {
    this.loader.setLoading(true);
    return this.leaderboardStore.fetchLeaderboards().pipe(
      skipWhile((loading) => !loading),
      map(() => {
        this.loader.setLoading(false);
      })
    );
  }
}

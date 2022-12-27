import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PokerOddsFacade } from '@ppo/game/domain';
import { LoaderService } from '@ppo/shared/ui';
import { map, Observable, skipWhile } from 'rxjs';

@Injectable()
export class LeaderboardsResolver implements Resolve<void> {
  constructor(
    private pokerOddsFacade: PokerOddsFacade,
    private loader: LoaderService
  ) {}
  resolve(): Observable<void> {
    this.pokerOddsFacade.refreshLeaderboards();
    this.loader.setLoading(true);
    return this.pokerOddsFacade.fetchingLeaderboards$.pipe(
      skipWhile((loading) => !loading),
      map(() => {
        this.loader.setLoading(false);
      })
    );
  }
}

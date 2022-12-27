import { Component, OnDestroy } from '@angular/core';
import { AuthFacade } from '@ppo/auth/domain';
import { PokerOddsFacade } from '@ppo/game/domain';
import { filter, map, withLatestFrom } from 'rxjs';
@Component({
  selector: 'ppo-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss'],
})
export class LeaderboardsComponent implements OnDestroy {
  constructor(
    private pokerOddsFacade: PokerOddsFacade,
    private auth: AuthFacade
  ) {}
  userScores$ = this.pokerOddsFacade.userScores$.pipe(filter(Boolean));
  loading$ = this.pokerOddsFacade.fetchingLeaderboards$;
  currentUserScore$ = this.auth.user$
    .pipe(withLatestFrom(this.userScores$))
    .pipe(
      map(([currentUser, userScores]) =>
        userScores.find((score) => score.username === currentUser?.username)
      ),
      filter(Boolean)
    );
  refreshScores(): void {
    this.pokerOddsFacade.refreshLeaderboards();
  }
  ngOnDestroy(): void {
    this.pokerOddsFacade.reset();
  }
}

import { Component, OnDestroy } from '@angular/core';
import { AuthFacade } from '@ppo/auth/data-access';
import { PokerOddsFacade } from '@ppo/poker-odds/data-access';
import { filter } from 'rxjs';
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
  currentUser$ = this.auth.user$;
  refreshScores(): void {
    this.pokerOddsFacade.refreshLeaderboards();
  }
  ngOnDestroy(): void {
    this.pokerOddsFacade.reset();
  }
}

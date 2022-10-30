import { Component, OnDestroy } from '@angular/core';
import { PokerOddsFacade } from '@ppo/poker-odds/data-access';
@Component({
  selector: 'ppo-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss'],
})
export class LeaderboardsComponent implements OnDestroy {
  constructor(private pokerOddsFacade: PokerOddsFacade) {}
  userScores$ = this.pokerOddsFacade.userScores$;
  loading$ = this.pokerOddsFacade.fetchingLeaderboards$;
  refreshScores(): void {
    this.pokerOddsFacade.refreshLeaderboards();
  }
  ngOnDestroy(): void {
    this.pokerOddsFacade.reset();
  }
}

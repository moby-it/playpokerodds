import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { LeaderboardsComponent } from './leaderboards.component';
import { LeaderboardsResolver } from './leaderboards.resolvers';
import { PokerOddsLeaderboardsRoutingModule } from './poker-odds-leaderboards.routing.module';

@NgModule({
  imports: [CommonModule, PokerOddsLeaderboardsRoutingModule, LetModule],
  declarations: [LeaderboardsComponent],
  providers: [LeaderboardsResolver],
})
export class PokerOddsLeaderboardsModule {}

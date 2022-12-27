import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { LeaderboardsComponent } from './leaderboards.component';
import { LeaderboardsResolver } from './leaderboards.resolvers';
import { LeaderboardsPositionPipe } from './leaderboards-position.pipe';
import { LeaderboardsRoutingModule } from './poker-odds-leaderboards.routing.module';

@NgModule({
  imports: [CommonModule, LeaderboardsRoutingModule, LetModule],
  declarations: [LeaderboardsComponent, LeaderboardsPositionPipe],
  providers: [LeaderboardsResolver],
})
export class LeaderboardsModule {}

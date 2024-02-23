import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { LeaderboardsPositionPipe } from './leaderboards-position.pipe';
import { LeaderboardsComponent } from './leaderboards.component';
import { LeaderboardsResolver } from './leaderboards.resolvers';
import { LeaderboardsRoutingModule } from './leaderboards.routing.module';
import { LeaderboardsStore } from './leaderboards.store';

@NgModule({
  imports: [CommonModule, LeaderboardsRoutingModule, LetDirective],
  declarations: [LeaderboardsComponent, LeaderboardsPositionPipe],
  providers: [LeaderboardsResolver, LeaderboardsStore],
})
export class LeaderboardsModule {}

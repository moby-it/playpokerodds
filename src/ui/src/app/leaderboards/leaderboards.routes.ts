import { Routes } from '@angular/router';
import { LeaderboardsComponent } from './leaderboards.component';
import { LeaderboardsResolver } from './leaderboards.resolvers';

export const routes: Routes = [
  {
    path: '',
    component: LeaderboardsComponent,
    resolve: [LeaderboardsResolver],
  },
];

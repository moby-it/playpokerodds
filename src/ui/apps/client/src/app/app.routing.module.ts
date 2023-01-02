import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
  },
  {
    path: 'play',
    loadChildren: () => import('@ppo/game/ui').then((m) => m.GameUiModule),
  },
  {
    path: 'leaderboards',
    loadChildren: () =>
      import('@ppo/leaderboards').then((m) => m.LeaderboardsModule),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

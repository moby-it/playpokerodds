import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
  },
  {
    path: 'play',
    loadChildren: () => import('@ppo/play/ui').then((m) => m.PlayUiModule),
  },
  {
    path: 'leaderboards',
    loadChildren: () =>
      import('@ppo/leaderboards').then((m) => m.LeaderboardsModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('@ppo/user/ui').then((m) => m.profileRoutes),
  },
  {
    path: 'about',
    component: AboutComponent,
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
export class AppRoutingModule { }

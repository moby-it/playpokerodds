import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './home/homepage.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
  },
  {
    path: 'play',
    loadChildren: () => import('@app/play/play.routes').then((m) => m.routes),
  },
  {
    path: 'leaderboards',
    loadChildren: () =>
      import('@app/leaderboards/leaderboards.routes').then((m) => m.routes),
  },
  {
    path: 'profile',
    loadChildren: () => import('@app/user/user.routes').then((m) => m.profileRoutes),
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

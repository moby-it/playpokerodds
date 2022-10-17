import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomepageComponent,
  //   pathMatch: 'full',
  // },
  {
    path: 'play',
    loadChildren: () =>
      import('@ppo/poker-odds/game').then((m) => m.PokerOddsGameModule),
  },
  {
    path: '**',
    redirectTo: '/play',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Routes } from '@angular/router';
import { ExistingGameGuard } from './existing-game.guard';
import { PlayComponent } from './play.component';

export const routes: Routes = [
  {
    path: ':id',
    component: PlayComponent,
    canActivate: [ExistingGameGuard],
  },
  {
    path: '',
    component: PlayComponent,
    canActivate: [ExistingGameGuard],
  },
];

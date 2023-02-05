import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExistingGameGuard } from './existing-game.guard';
import { PlayComponent } from './play.component';
const routes: Routes = [
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
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokerOddsRoutingModule {}

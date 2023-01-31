import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExistingGameGuard } from './existing-game.guard';
import { GameUiComponent } from './game.component';
const routes: Routes = [
  {
    path: ':id',
    component: GameUiComponent,
    canActivate: [ExistingGameGuard],
  },
  {
    path: '',
    component: GameUiComponent,
    canActivate: [ExistingGameGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokerOddsRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameUiComponent } from './poker-odds-game.component';
const routes: Routes = [
  {
    path: '',
    component: GameUiComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokerOddsRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokerOddsGameComponent } from './poker-odds-game.component';
const routes: Routes = [
  {
    path: '',
    component: PokerOddsGameComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokerOddsRoutingModule {}

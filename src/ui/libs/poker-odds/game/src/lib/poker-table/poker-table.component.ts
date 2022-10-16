import { Component } from '@angular/core';
import { PokerOddsFacade } from '@ppo/poker-odds/data-access';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'ppo-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.css'],
})
export class PokerTableComponent {
  constructor(private pokerFacade: PokerOddsFacade) {}
  round$ = this.pokerFacade.currentRound$.pipe(
    filter(Boolean),
    tap((round) => console.log('new round', round))
  );
}

import { Component, OnDestroy } from '@angular/core';
import { PokerOddsFacade } from '@ppo/poker-odds/data-access';

@Component({
  selector: 'ppo-poker-odds-game',
  templateUrl: './poker-odds-game.component.html',
  styleUrls: ['./poker-odds-game.component.css'],
})
export class PokerOddsGameComponent implements OnDestroy {
  constructor(private pokerOddsFacade: PokerOddsFacade) {}
  ngOnDestroy(): void {
    this.pokerOddsFacade.reset();
  }
}

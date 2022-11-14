import { Component } from '@angular/core';
import { PokerOddsFacade } from '@ppo/poker-odds/data-access';

@Component({
  selector: 'ppo-revealed-cards-toggle',
  templateUrl: './revealed-cards-toggle.component.html',
  styleUrls: ['./revealed-cards-toggle.component.css'],
})
export class RevealedCardsToggleComponent {
  constructor(private pokerFacade: PokerOddsFacade) {}
  revealedCards$ = this.pokerFacade.playingWithRevealedCards$;
  toggleRevealedCards(): void {
    this.pokerFacade.togglePlayRevealedCards();
  }
}

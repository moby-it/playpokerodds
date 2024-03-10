import { Component } from '@angular/core';
import { PokerOddsStore } from '@app/play/poker-odds.store';

@Component({
  selector: 'ppo-revealed-cards-toggle',
  templateUrl: './revealed-cards-toggle.component.html',
  styleUrls: ['./revealed-cards-toggle.component.css'],
  standalone: true
})
export class RevealedCardsToggleComponent {
  constructor(private pokerStore: PokerOddsStore) { }
  revealedCards = this.pokerStore.playingWithRevealedCards;
  toggleRevealedCards(): void {
    this.pokerStore.togglePlayRevealedCards();
  }
}

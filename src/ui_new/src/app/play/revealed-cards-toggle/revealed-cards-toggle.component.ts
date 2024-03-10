import { Component } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { PokerOddsFacade } from '@ppo/play/domain';

@Component({
  selector: 'ppo-revealed-cards-toggle',
  imports: [PushPipe],
  templateUrl: './revealed-cards-toggle.component.html',
  styleUrls: ['./revealed-cards-toggle.component.css'],
  standalone: true
})
export class RevealedCardsToggleComponent {
  constructor(private pokerFacade: PokerOddsFacade) { }
  revealedCards$ = this.pokerFacade.playingWithRevealedCards$;
  toggleRevealedCards(): void {
    this.pokerFacade.togglePlayRevealedCards();
  }
}

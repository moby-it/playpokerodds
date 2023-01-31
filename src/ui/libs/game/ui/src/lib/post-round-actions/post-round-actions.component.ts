import { Component } from '@angular/core';
import { PokerOddsFacade } from '@ppo/game/domain';
@Component({
  selector: 'ppo-post-round-actions',
  templateUrl: './post-round-action.component.html',
})
export class PostRoundActionsComponent {
  constructor(private pokerFacade: PokerOddsFacade) {}
  copyToClipboard(): void {
    this.pokerFacade.copyRoundUrlToClipboard();
  }
  saveToFavorites(): void {
    // this.pokerFacade.
  }
}

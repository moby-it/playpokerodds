import { Component } from '@angular/core';
import { PokerOddsFacade } from '@ppo/game/domain';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'ppo-post-round-actions',
  templateUrl: './post-round-action.component.html',
})
export class PostRoundActionsComponent {
  constructor(
    private pokerFacade: PokerOddsFacade,
    private clipboard: Clipboard
  ) {}
  copyToClipboard(): void {
    // this.clipboard.copy();
  }
  saveToFavorites(): void {
    // this.pokerFacade.
  }
}

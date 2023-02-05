import { Component } from '@angular/core';
import { AuthFacade } from '@ppo/auth/domain';
import { PokerOddsFacade } from '@ppo/play/domain';
@Component({
  selector: 'ppo-post-round-actions',
  templateUrl: './post-round-action.component.html',
})
export class PostRoundActionsComponent {
  favoritesFill = 'transparent';
  constructor(
    private pokerFacade: PokerOddsFacade,
    private authFacade: AuthFacade
  ) {}
  showFavoriteIcon$ = this.authFacade.isLoggedIn$;
  copyToClipboard(): void {
    this.pokerFacade.copyRoundUrlToClipboard();
  }
  saveToFavorites(): void {
    if (this.favoritesFill === 'transparent') {
      this.pokerFacade.saveToFavorites();
      this.favoritesFill = 'white';
    }
  }
}

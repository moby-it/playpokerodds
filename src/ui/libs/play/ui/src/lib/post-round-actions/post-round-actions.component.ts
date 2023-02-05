import { Component } from '@angular/core';
import { AuthFacade } from '@ppo/auth/domain';
import { PokerOddsFacade } from '@ppo/play/domain';
import { map } from 'rxjs';
@Component({
  selector: 'ppo-post-round-actions',
  templateUrl: './post-round-action.component.html',
})
export class PostRoundActionsComponent {
  constructor(
    private pokerFacade: PokerOddsFacade,
    private authFacade: AuthFacade
  ) {}
  roundId$ = this.pokerFacade.answer$.pipe(map((a) => a?.roundId));
  showFavoriteIcon$ = this.authFacade.isLoggedIn$;
}

import { Component } from '@angular/core';
import { LetDirective, PushPipe } from '@ngrx/component';
import { AuthFacade } from '@ppo/auth/domain';
import { PokerOddsFacade } from '@ppo/play/domain';
import { CopyRoundLinkButtonComponent, FavoriteButtonComponent } from '@ppo/round/ui';
import { map } from 'rxjs';
@Component({
  selector: 'ppo-post-round-actions',
  imports: [CopyRoundLinkButtonComponent, FavoriteButtonComponent, PushPipe, LetDirective],
  templateUrl: './post-round-action.component.html',
  standalone: true,
})
export class PostRoundActionsComponent {
  constructor(
    private pokerFacade: PokerOddsFacade,
    private authFacade: AuthFacade
  ) { }
  roundId$ = this.pokerFacade.answer$.pipe(map((a) => a?.roundId));
  showFavoriteIcon$ = this.authFacade.isLoggedIn$;
}

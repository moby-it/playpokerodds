import { Component, computed } from '@angular/core';
import { AuthStore } from '@app/auth/auth.store';
import { PokerOddsStore } from '@app/play/poker-odds.store';
import { CopyRoundLinkButtonComponent, FavoriteButtonComponent } from '@app/round/poker-table';
import { map } from 'rxjs';
@Component({
  selector: 'ppo-post-round-actions',
  imports: [CopyRoundLinkButtonComponent, FavoriteButtonComponent],
  templateUrl: './post-round-action.component.html',
  standalone: true,
})
export class PostRoundActionsComponent {
  constructor(
    private pokerStore: PokerOddsStore,
    private authStore: AuthStore
  ) { }
  roundId = computed(() => this.pokerStore.answer()?.roundId);
  showFavoriteIcon = this.authStore.isLoggedIn;
}

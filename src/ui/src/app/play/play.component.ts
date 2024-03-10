import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthStore } from '@app/auth/auth.store';
import { PokerOddsStore } from '@app/play/poker-odds.store';
import { PokerTableComponent } from '@app/round/poker-table';
import { ToastrService } from 'ngx-toastr';
import { GuessBoxComponent } from './guess-box/guess-box.component';
import { RevealedCardsToggleComponent } from './revealed-cards-toggle/revealed-cards-toggle.component';
@Component({
  selector: 'ppo-play',
  imports: [GuessBoxComponent, PokerTableComponent, RevealedCardsToggleComponent],
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  standalone: true
})
export class PlayComponent implements OnDestroy, OnInit {
  constructor(
    private pokerOddsFacade: PokerOddsStore,
    private authStore: AuthStore,
    private toastr: ToastrService
  ) { }
  round = this.pokerOddsFacade.currentRound;
  ngOnInit(): void {
    if (this.authStore.isLoggedIn()) {
      const activeToast = this.toastr.info(
        'If you want your score to be saved on the leaderboards you have to be logged in!',
        ''
      );
      activeToast.onAction.subscribe((s) => console.log(s));
    }
  }
  ngOnDestroy(): void {
    this.pokerOddsFacade.reset();
  }
}

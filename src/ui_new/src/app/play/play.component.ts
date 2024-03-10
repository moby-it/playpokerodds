import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokerOddsFacade } from '@ppo/play/domain';
import { ToastrService } from 'ngx-toastr';
import { AuthFacade } from '@ppo/auth/domain';
import { take } from 'rxjs';
import { GuessBoxComponent } from './guess-box/guess-box.component';
import { PokerTableComponent } from '@ppo/round/ui';
import { RevealedCardsToggleComponent } from './revealed-cards-toggle/revealed-cards-toggle.component';
import { PushPipe } from '@ngrx/component';
@Component({
  selector: 'ppo-play',
  imports: [GuessBoxComponent, PokerTableComponent, RevealedCardsToggleComponent, PushPipe],
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  standalone: true
})
export class PlayComponent implements OnDestroy, OnInit {
  constructor(
    private pokerOddsFacade: PokerOddsFacade,
    private authFacade: AuthFacade,
    private toastr: ToastrService
  ) { }
  round$ = this.pokerOddsFacade.currentRound$;
  ngOnInit(): void {
    this.authFacade.isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        const activeToast = this.toastr.info(
          'If you want your score to be saved on the leaderboards you have to be logged in!',
          ''
        );
        activeToast.onAction.subscribe((s) => console.log(s));
      }
    });
  }
  ngOnDestroy(): void {
    this.pokerOddsFacade.reset();
  }
}

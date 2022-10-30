import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokerOddsFacade } from '@ppo/poker-odds/data-access';
import { ToastrService } from 'ngx-toastr';
import { AuthFacade } from '@ppo/auth/data-access';
import { take } from 'rxjs';
@Component({
  selector: 'ppo-poker-odds-game',
  templateUrl: './poker-odds-game.component.html',
  styleUrls: ['./poker-odds-game.component.css'],
})
export class PokerOddsGameComponent implements OnDestroy, OnInit {
  constructor(
    private pokerOddsFacade: PokerOddsFacade,
    private authFacade: AuthFacade,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.authFacade.isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        const activeToast = this.toastr.info(
          'If you want your score to be saved on the leaderboards you have to be logged in!',
          '',
          {
            timeOut: 5000,
          }
        );
        activeToast.onAction.subscribe((s) => console.log(s));
      }
    });
  }
  ngOnDestroy(): void {
    this.pokerOddsFacade.reset();
  }
}

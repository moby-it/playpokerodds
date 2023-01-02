import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokerOddsFacade } from '@ppo/game/domain';
import { ToastrService } from 'ngx-toastr';
import { AuthFacade } from '@ppo/auth/domain';
import { take } from 'rxjs';
@Component({
  selector: 'ppo-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameUiComponent implements OnDestroy, OnInit {
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

import { Component } from '@angular/core';
import { AuthFacade } from '@gtop-ui/auth/data-access';
import { PokerOddsFacade } from '@gtop-ui/poker-odds/data-access';

@Component({
  selector: 'gtop-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private authFacade: AuthFacade,
    private pokerOddsFacade: PokerOddsFacade
  ) {}
  status$ = this.authFacade.status$;
  round$ = this.pokerOddsFacade.currentRound$;
}

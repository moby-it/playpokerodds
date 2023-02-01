import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokerOddsFacade } from '@ppo/game/domain';
@Component({
  selector: 'ppo-user-profile-container',
  templateUrl: './user-profile-container.component.html',
  standalone: true,
  imports: [RouterModule],
})
export class UserProfileContainerComponent {
  constructor() {
    console.log(inject(PokerOddsFacade));
  }
}

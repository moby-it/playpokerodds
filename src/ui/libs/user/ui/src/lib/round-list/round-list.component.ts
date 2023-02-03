import { Component, Input } from '@angular/core';
import { UserRound } from '@ppo/user/domain';

@Component({
  selector: 'ppo-round-list',
  templateUrl: './round-list.component.html',
})
export class RoundListComponent {
  @Input() rounds: UserRound[] = [];
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PushModule } from '@ngrx/component';
import { PokerTableModule } from '@ppo/shared/ui';
import { UserRoundViewmodel } from '@ppo/user/domain';
import { BehaviorSubject } from 'rxjs';
import { SuitToSvgPipe } from './suitToSvg.pipe';

@Component({
  selector: 'ppo-round-list',
  templateUrl: './round-list.component.html',
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
      }
    `,
  ],
  standalone: true,
  imports: [PokerTableModule, CommonModule, PushModule, SuitToSvgPipe],
})
export class RoundListComponent {
  selectedRound$ = new BehaviorSubject<UserRoundViewmodel | null>(null);
  @Input() rounds: UserRoundViewmodel[] = [];
  selectRound(round: UserRoundViewmodel): void {
    this.selectedRound$.next(round);
  }
}

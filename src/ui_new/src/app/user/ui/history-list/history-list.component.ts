import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { UserProfileFacade } from '@ppo/user/domain';
import { RoundListComponent } from '../round-list/round-list.component';

@Component({
  selector: 'ppo-history-list',
  templateUrl: './history-list.component.html',
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
      }
    `,
  ],
  standalone: true,
  imports: [LetDirective, CommonModule, RoundListComponent],
})
export class HistoryListComponent {
  constructor(private userProfile$: UserProfileFacade) {}
  rounds$ = this.userProfile$.rounds$;
}

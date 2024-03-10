import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserProfileStore } from '@app/user/user-profile.store';
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
  imports: [CommonModule, RoundListComponent],
})
export class HistoryListComponent {
  constructor(private userProfile: UserProfileStore) { }
  rounds = this.userProfile.rounds;
}

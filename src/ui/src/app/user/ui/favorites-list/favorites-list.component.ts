import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserProfileStore } from '@app/user/user-profile.store';
import { RoundListComponent } from '../round-list/round-list.component';

@Component({
  selector: 'ppo-favorites-list',
  templateUrl: './favorites-list.component.html',
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
export class FavoritesListComponent {
  constructor(private userProfile: UserProfileStore) { }
  favoriteRounds = this.userProfile.favoriteRounds;
}

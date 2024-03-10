import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { UserProfileFacade } from '@app/user/domain/user-profile-store';
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
  imports: [CommonModule, LetDirective, RoundListComponent],
})
export class FavoritesListComponent {
  constructor(private userProfile$: UserProfileFacade) { }
  favoriteRounds$ = this.userProfile$.favoriteRounds$;
}

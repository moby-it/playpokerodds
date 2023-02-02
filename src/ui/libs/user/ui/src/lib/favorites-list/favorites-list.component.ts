import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PushModule } from '@ngrx/component';
import { UserProfileFacade } from '@ppo/user/domain';
import { map, tap } from 'rxjs';

@Component({
  selector: 'ppo-favorites-list',
  templateUrl: './favorites-list.component.html',
  standalone: true,
  imports: [CommonModule, PushModule],
})
export class FavoritesListComponent {
  constructor(private userProfile$: UserProfileFacade) {}
  favoriteRounds$ = this.userProfile$.userProfile$.pipe(
    map((p) => p.roundAnswers.filter((r) => p.roundFavoriteIds.includes(r.roundId))),
    tap(console.log)
  );
}

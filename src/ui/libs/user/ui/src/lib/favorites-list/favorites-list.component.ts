import { Component } from '@angular/core';
import { UserProfileFacade } from '@ppo/user/domain';
import { map } from 'rxjs';

@Component({
  selector: 'ppo-favorites-list',
  templateUrl: './favorites-list.component.html',
  standalone: true,
})
export class FavoritesListComponent {
  constructor(private userProfile$:UserProfileFacade){}
  // favoriteRounds$= this.userProfile$.userProfile$.pipe(map(p => p.rounds.filter(r => r.``)))
}

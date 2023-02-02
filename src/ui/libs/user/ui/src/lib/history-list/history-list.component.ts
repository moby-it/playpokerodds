import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PushModule } from '@ngrx/component';
import { UserProfileFacade } from '@ppo/user/domain';
import { map } from 'rxjs';

@Component({
  selector: 'ppo-history-list',
  templateUrl: './history-list.component.html',
  standalone: true,
  imports: [PushModule, CommonModule],
})
export class HistoryListComponent {
  constructor(private userProfile$: UserProfileFacade) {}
  rounds$ = this.userProfile$.userProfile$.pipe(map((p) => p.rounds));
}

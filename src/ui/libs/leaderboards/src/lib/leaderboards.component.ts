import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@ppo/auth/domain';
import { filter, map, withLatestFrom } from 'rxjs';
import { UserScore } from './dtos';
import { LeaderboardsStore } from './leaderboards.store';
@Component({
  selector: 'ppo-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss'],
})
export class LeaderboardsComponent {
  constructor(
    private auth: AuthFacade,
    private leaderboardsStore: LeaderboardsStore,
    private router: Router
  ) {}
  userScores$ = this.leaderboardsStore.userScores$;
  currentUserScore$ = this.auth.user$
    .pipe(withLatestFrom(this.userScores$))
    .pipe(
      map(([currentUser, userScores]) =>
        userScores.find((score) => score.username === currentUser?.username)
      ),
      filter(Boolean)
    );
  refreshScores(): void {
    this.leaderboardsStore.fetchLeaderboards();
  }
  navigateToUser(userScore: UserScore): void {
    this.router.navigate(['/profile', userScore.username]);
  }
}

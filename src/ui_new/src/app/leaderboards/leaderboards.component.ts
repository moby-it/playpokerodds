import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '@app/auth/auth.store';
import { LeaderboardsPositionPipe } from './leaderboards-position.pipe';
import { LeaderboardsStore } from './leaderboards.store';
import { UserScore } from './userScores.dto';
@Component({
  selector: 'ppo-leaderboards',
  templateUrl: './leaderboards.component.html',
  imports: [LeaderboardsPositionPipe],
  standalone: true,
  styleUrls: ['./leaderboards.component.scss'],
})
export class LeaderboardsComponent {
  constructor(
    private auth: AuthStore,
    private leaderboardsStore: LeaderboardsStore,
    private router: Router
  ) { }
  userScores = this.leaderboardsStore.userScores;
  currentUserScore = computed(() => {
    return this.userScores().find(score => score.username === this.auth.username());
  });
  navigateToUser(userScore: UserScore | undefined): void {
    if (userScore)
      this.router.navigate(['/profile', userScore.username]);
  }
}

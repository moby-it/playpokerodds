import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@ppo/auth/data-access';
import { UserScores } from '@ppo/poker-odds/data-access';

@Pipe({
  name: 'leaderboardsPosition',
})
export class LeaderboardsPositionPipe implements PipeTransform {
  transform(scores: UserScores, currentUser: User): string {
    const i = scores.findIndex(
      (score) => score.username === currentUser.username
    );
    return i >= 0 ? (i + 1).toString() : '-';
  }
}

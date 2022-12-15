import { Pipe, PipeTransform } from '@angular/core';
import { UserScore } from '@ppo/poker-odds/data-access';
import { User } from '@ppo/auth/data-access';

@Pipe({
  name: 'leaderboardsPosition',
})
export class LeaderboardsPositionPipe implements PipeTransform {
  transform(scores: UserScore[], currentUser: User): string {
    const i = scores.findIndex(
      (score) => score.username === currentUser.username
    );
    return i >= 0 ? (i + 1).toString() : '-';
  }
}

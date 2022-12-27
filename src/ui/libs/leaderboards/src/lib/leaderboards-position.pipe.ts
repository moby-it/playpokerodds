import { Pipe, PipeTransform } from '@angular/core';
import { UserScore } from '@ppo/game/domain';
import { User } from '@ppo/auth/domain';

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

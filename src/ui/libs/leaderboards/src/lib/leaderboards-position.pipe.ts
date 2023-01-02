import { Pipe, PipeTransform } from '@angular/core';
import { UserScore } from '@ppo/game/domain';

@Pipe({
  name: 'leaderboardsPosition',
})
export class LeaderboardsPositionPipe implements PipeTransform {
  transform(scores: UserScore[], currentUserScore: UserScore): string {
    const i = scores.findIndex(
      (score) => score.username === currentUserScore.username
    );
    return i >= 0 ? (i + 1).toString() : '-';
  }
}

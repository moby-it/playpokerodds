import { Pipe, PipeTransform } from '@angular/core';
import { UserScore } from './userScores.dto';

@Pipe({
  name: 'leaderboardsPosition',
  standalone: true
})
export class LeaderboardsPositionPipe implements PipeTransform {
  transform(scores: UserScore[], currentUserScore: UserScore | undefined): string {
    if (currentUserScore) {
      const i = scores.findIndex(
        (score) => score.username === currentUserScore.username
      );
      return i >= 0 ? (i + 1).toString() : '-';
    }
    return ''
  }
}

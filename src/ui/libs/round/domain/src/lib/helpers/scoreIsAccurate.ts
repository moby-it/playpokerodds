import { Pipe, PipeTransform } from '@angular/core';
import { RoundAnswer } from '@ppo/round/domain';
import { map, Observable } from 'rxjs';

export const scoreIsAccurate = (score: number): boolean => Math.abs(score) < 5;

export function estimateWasAccurate$(
  roundAnswer$: Observable<RoundAnswer>
): Observable<boolean> {
  return roundAnswer$.pipe(map((answer) => scoreIsAccurate(answer.score)));
}
@Pipe({ name: 'scoreIsAccurate', standalone: true })
export class ScoreIsAccuratePipe implements PipeTransform {
  transform(score: number): boolean {
    return scoreIsAccurate(score);
  }
}

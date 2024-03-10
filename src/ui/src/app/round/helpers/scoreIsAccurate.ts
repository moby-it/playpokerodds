import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RoundAnswer } from '../dtos';

export const scoreIsAccurate = (score: number): boolean => Math.abs(score) < 5;

export function estimateWasAccurate$(
  roundAnswer$: Observable<RoundAnswer>
): Observable<boolean> {
  return roundAnswer$.pipe(map((answer) => scoreIsAccurate(answer.score)));
}
@Pipe({ name: 'scoreIsAccurate', standalone: true })
export class ScoreIsAccuratePipe implements PipeTransform {
  transform(score?: number | undefined): boolean {
    if (typeof score !== 'number') throw new Error('invalid pipe input');
    return scoreIsAccurate(score);
  }
}

import { RoundAnswerDto } from '@moby-it/ppo-core';
import { map, Observable } from 'rxjs';

export function estimateWasAccurate(roundAnswer: RoundAnswerDto): boolean {
  return Math.abs(roundAnswer.score) < 5;
}
export function estimateWasAccurate$(
  roundAnswer$: Observable<RoundAnswerDto>
): Observable<boolean> {
  return roundAnswer$.pipe(map(estimateWasAccurate));
}

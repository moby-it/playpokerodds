import { map, Observable } from 'rxjs';
import { RoundAnswer } from '../dtos';

export function estimateWasAccurate(roundAnswer: RoundAnswer): boolean {
  return Math.abs(roundAnswer.score) < 5;
}
export function estimateWasAccurate$(
  roundAnswer$: Observable<RoundAnswer>
): Observable<boolean> {
  return roundAnswer$.pipe(map(estimateWasAccurate));
}

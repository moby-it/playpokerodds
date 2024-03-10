import { Pipe, PipeTransform } from '@angular/core';
const createGoodGuessMessage = (percent: number): string =>
  `You were only ${percent} % off!`;
const createBadGuessMessage = (percent: number): string =>
  `You were ${percent} % off!`;
const SPOT_ON_MESSAGE = 'Wow, spot on!';
@Pipe({
  name: 'formatAnswerMessage',
  standalone: true,
})
export class GuessBoxAnswerMessagePipe implements PipeTransform {
  transform(score: number | undefined): string {
    if (typeof score !== 'number') return '';
    if (score === 0) {
      return SPOT_ON_MESSAGE;
    }
    if (score < 5) {
      return createGoodGuessMessage(score);
    } else {
      return createBadGuessMessage(score);
    }
  }
}

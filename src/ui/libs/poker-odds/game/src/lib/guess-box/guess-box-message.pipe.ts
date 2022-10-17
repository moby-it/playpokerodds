import { Pipe, PipeTransform } from '@angular/core';
import { RoundAnswerDto } from '@moby-it/ppo-core';
const createGoodGuessMessage = (percent: number) =>
  `Good Guess! You were only ${percent} % off!`;
const createBadGuessMessage = (percent: number) => `You were ${percent} % off!`;
const SPOT_ON_MESSAGE = 'Wow, spot on!';
@Pipe({
  name: 'formatAnswerMessage',
})
export class GuessBoxAnswerMessagePipe implements PipeTransform {
  transform(answer: RoundAnswerDto): string {
    const score = Math.abs(answer.score);
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

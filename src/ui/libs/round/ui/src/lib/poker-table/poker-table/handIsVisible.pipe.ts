import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '@moby-it/poker-core';

@Pipe({
  name: 'handIsVisible',
})
export class HandIsVisiblePipe implements PipeTransform {
  transform(hand: Card[]): boolean {
    return hand.some((c) => c !== '..');
  }
}

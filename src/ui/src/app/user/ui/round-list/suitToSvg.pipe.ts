import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'suitToSvg',
  standalone: true,
})
export class SuitToSvgPipe implements PipeTransform {
  transform(card: string, size: 'sm' | 'md' | 'lg' = 'md'): string {
    if (card.length !== 2)
      throw new Error('cannot convert suite to svg. Incorrect card length');
    const suit = card[1];
    if (suit === 'h') return `/assets/heart-${size}.svg`;
    if (suit === 's') return `/assets/spade-${size}.svg`;
    if (suit === 'd') return `/assets/diamond-${size}.svg`;
    if (suit === 'c') return `/assets/club-${size}.svg`;
    throw new Error('cannot convert suite to svg. Incorrect card suit');
  }
}

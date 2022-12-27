import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'handBadgeGridPosition',
})
export class HandBadgeGridPositionPipe implements PipeTransform {
  transform(
    index: number
  ): Pick<CSSStyleDeclaration, 'gridColumn' | 'gridRow'> {
    const position = index + 1;
    switch (position) {
      case 1:
        return {
          gridColumn: '2',
          gridRow: '4',
        };
      case 2:
        return {
          gridColumn: '2',
          gridRow: '2',
        };
      case 3:
        return {
          gridColumn: '4',
          gridRow: '1',
        };
      case 4:
        return {
          gridColumn: '6',
          gridRow: '1',
        };
      case 5:
        return {
          gridColumn: '8',
          gridRow: '1',
        };
      case 6:
        return {
          gridColumn: '10',
          gridRow: '1',
        };
      case 7:
        return {
          gridColumn: '12',
          gridRow: '2',
        };
      case 8:
        return {
          gridColumn: '12',
          gridRow: '4',
        };
      default:
        throw new Error('cannot fit badge to grid');
    }
  }
}

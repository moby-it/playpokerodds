import { Component, Input } from '@angular/core';
import { Card } from '@moby-it/poker-core';
import { fadeAnimation } from '@app/shared/ui/animations/fadeIn';
@Component({
  selector: 'ppo-card',
  template: `
  @if (back) {
    <img src="/assets/cards/card_hidden.svg" @fade alt="" srcset="" />
  } @else {
    <img src="/assets/cards/{{ card }}.svg" @fade alt="" srcset="" />
  }
  `,
  animations: [fadeAnimation],
  standalone: true
})
export class CardComponent {
  @Input() back = false;
  @Input() card: Card | undefined;
  cardLink = '/assets/svg-cards.svg#';
}

import { Component, input } from '@angular/core';
import { fadeAnimation } from '@app/shared/ui/animations/fadeIn';
import { Card } from '@moby-it/poker-core';
@Component({
  selector: 'ppo-card',
  template: `
  @if (back()) {
    <img src="/assets/cards/card_hidden.svg" @fade alt="" srcset="" />
  } @else {
    <img src="/assets/cards/{{ card() }}.svg" @fade alt="" srcset="" />
  }
  `,
  animations: [fadeAnimation],
  standalone: true
})
export class CardComponent {
  back = input(false);
  card = input<Card>();
  cardLink = '/assets/svg-cards.svg#';
}

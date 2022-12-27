import { Component, Input } from '@angular/core';
import { Card } from '@moby-it/ppo-core';
import { Animations } from '@ppo/shared/ui';
@Component({
  selector: 'ppo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [Animations.fadeAnimation],
})
export class CardComponent {
  @Input() back = false;
  @Input() card: Card | undefined;
  cardLink = '/assets/svg-cards.svg#';
}

import { Component, Input } from '@angular/core';
import { Card } from '@moby-it/ppo-core';
import { fadeAnimation } from '../../../../../../shared/ui/src/lib/animations';
@Component({
  selector: 'ppo-card',
  templateUrl: './card.component.html',
  animations: [fadeAnimation],
})
export class CardComponent {
  @Input() back = false;
  @Input() card: Card | undefined;
  cardLink = '/assets/svg-cards.svg#';
}

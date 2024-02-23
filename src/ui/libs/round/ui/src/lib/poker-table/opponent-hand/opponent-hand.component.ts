import { Component, Input } from '@angular/core';
import { Card } from '@moby-it/poker-core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'ppo-opponent-hand',
  imports: [CardComponent],
  template: `
  @if (isVisible) {
  <div class="opponent-hand">
    @for (card of hand; track card) {
      <ppo-card [card]="card" class="card"></ppo-card>
    }
  </div>
} @else {
  <div class="opponent-hand">
    @for (card of hand; track card) {
      <ppo-card [back]="true" class="card"></ppo-card>
    }
  </div>
}
  `,
  styles: [`
  :host {
    z-index: 1;
  }
`],
  standalone: true
})
export class OpponentHandComponent {
  @Input() hand: Card[] = [];
  @Input() isVisible = false;
}

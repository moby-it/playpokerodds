import { Component, Input } from '@angular/core';
import { Card } from '@moby-it/poker-core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'ppo-playing-hand',
  imports: [CardComponent],
  template: `
    <div class="player-hand">
    @for (card of hand; track card) {
      <ppo-card [card]="card"></ppo-card>
    }
    </div>
  `,
  styles: [`
    :host {
      z-index: 1;
      grid-column: 4 /10;
      grid-row: 5;
    }
  `],
  standalone: true
})
export class PlayingHandComponent {
  @Input() hand: Card[] = [];
}

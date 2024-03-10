import { Component, Input } from '@angular/core';
import { Board } from '@moby-it/poker-core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'ppo-board',
  imports: [CardComponent],
  template: `
  @for (card of board; track card) {
    <ppo-card [card]="card"></ppo-card>
  }
  `,
  standalone: true
})
export class BoardComponent {
  @Input() board!: Board;
}

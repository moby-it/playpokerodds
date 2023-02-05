import { Component, Input } from '@angular/core';
import { Card } from '@moby-it/poker-core';

@Component({
  selector: 'ppo-opponent-hand',
  templateUrl: './opponent-hand.component.html',
  styleUrls: ['./opponent-hand.component.css'],
})
export class OpponentHandComponent {
  @Input() hand: Card[] = [];
  @Input() isVisible = false;
}

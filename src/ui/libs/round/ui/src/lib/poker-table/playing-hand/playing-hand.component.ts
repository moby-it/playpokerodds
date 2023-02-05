import { Component, Input } from '@angular/core';
import { Card } from '@moby-it/poker-core';

@Component({
  selector: 'ppo-playing-hand',
  templateUrl: './playing-hand.component.html',
  styleUrls: ['./playing-hand.component.css'],
})
export class PlayingHandComponent {
  @Input() hand: Card[] = [];
}

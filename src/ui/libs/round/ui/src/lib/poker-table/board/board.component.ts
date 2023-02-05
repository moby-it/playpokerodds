import { Component, Input } from '@angular/core';
import { Board } from '@moby-it/poker-core';

@Component({
  selector: 'ppo-board',
  templateUrl: './board.component.html',
})
export class BoardComponent {
  @Input() board!: Board;
}

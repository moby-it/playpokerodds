import { Component, Input } from '@angular/core';
import { Round } from '@moby-it/ppo-core';

@Component({
  selector: 'ppo-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.css'],
})
export class PokerTableComponent {
  @Input() round: Round | null | undefined;
}

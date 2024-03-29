import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Round } from '@moby-it/poker-core';
import { BoardComponent } from '../board/board.component';
import { OpponentHandComponent } from '../opponent-hand/opponent-hand.component';
import { PlayingHandComponent } from '../playing-hand/playing-hand.component';
import { HandBadgeGridPositionPipe } from './handBadgeGridPosition.pipe';
import { HandIsVisiblePipe } from './handIsVisible.pipe';

@Component({
  selector: 'ppo-poker-table',
  imports: [
    CommonModule,
    BoardComponent,
    PlayingHandComponent,
    OpponentHandComponent,
    HandIsVisiblePipe,
    HandBadgeGridPositionPipe
  ],
  templateUrl: './poker-table.component.html',
  styles: [`
    :host {
      flex: 1;
      display: flex;
    }
  `],
  standalone: true
})
export class PokerTableComponent {
  round = input<Round | null | undefined>();
}

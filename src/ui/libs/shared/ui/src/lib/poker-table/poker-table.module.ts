import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { OpponentHandComponent } from './opponent-hand/opponent-hand.component';
import { PlayingHandComponent } from './playing-hand/playing-hand.component';
import { HandBadgeGridPositionPipe } from './poker-table/handBadgeGridPosition.pipe';
import { HandIsVisiblePipe } from './poker-table/handIsVisible.pipe';
import { PokerTableComponent } from './poker-table/poker-table.component';

@NgModule({
  declarations: [
    BoardComponent,
    CardComponent,
    OpponentHandComponent,
    PlayingHandComponent,
    PokerTableComponent,
    HandIsVisiblePipe,
    HandBadgeGridPositionPipe,
  ],
  imports: [CommonModule],
  exports: [PokerTableComponent],
})
export class PokerTableModule {}

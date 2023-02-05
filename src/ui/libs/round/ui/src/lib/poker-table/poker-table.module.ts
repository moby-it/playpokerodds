import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  GuessBoxAnswerMessagePipe,
  ScoreIsAccuratePipe,
} from '@ppo/round/domain';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { OpponentHandComponent } from './opponent-hand/opponent-hand.component';
import { PlayingHandComponent } from './playing-hand/playing-hand.component';
import { HandBadgeGridPositionPipe } from './poker-table/handBadgeGridPosition.pipe';
import { HandIsVisiblePipe } from './poker-table/handIsVisible.pipe';
import { PokerTableComponent } from './poker-table/poker-table.component';
import { CopyRoundLinkButtonComponent } from './round-actions/copy-link/copy-link.component';
import { FavoriteButtonComponent } from './round-actions/favorite/favorite.component';
import { PlayRoundButtonComponent } from './round-actions/play/play-round.component';
import { RoundResultComponent } from './round-result/round-result.component';

@NgModule({
  declarations: [
    BoardComponent,
    CardComponent,
    OpponentHandComponent,
    PlayingHandComponent,
    PokerTableComponent,
    HandIsVisiblePipe,
    HandBadgeGridPositionPipe,
    RoundResultComponent,
  ],
  imports: [
    CommonModule,
    ScoreIsAccuratePipe,
    GuessBoxAnswerMessagePipe,
    CopyRoundLinkButtonComponent,
    FavoriteButtonComponent,
    PlayRoundButtonComponent,
  ],
  exports: [
    PokerTableComponent,
    RoundResultComponent,
    CopyRoundLinkButtonComponent,
    FavoriteButtonComponent,
    PlayRoundButtonComponent,
  ],
})
export class PokerTableModule {}

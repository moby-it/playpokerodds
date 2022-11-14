import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessBoxComponent } from './guess-box/guess-box.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { PokerTableComponent } from './poker-table/poker-table.component';
import { CardComponent } from './card/card.component';
import { PlayingHandComponent } from './playing-hand/playing-hand.component';
import { PlayerHandBadgeComponent } from './player-hand-badge/player-hand-badge.component';
import { BoardComponent } from './board/board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PokerOddsRoutingModule } from './poker-odds-game.routing.module';
import { PokerOddsGameComponent } from './poker-odds-game.component';
import { LetModule, PushModule } from '@ngrx/component';
import { HandBadgeGridPositionPipe } from './poker-table/handBadgeGridPosition.pipe';
import { SharedUiModule } from '@ppo/shared/ui';
import { GuessBoxAnswerMessagePipe } from './guess-box/guess-box-message.pipe';
import { OpponentHandComponent } from './opponent-hand/opponent-hand.component';
import { RevealedCardsToggleComponent } from './revealed-cards-toggle/revealed-cards-toggle.component';
import { HandIsVisiblePipe } from './poker-table/handIsVisible.pipe';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PokerOddsRoutingModule,
    LetModule,
    PushModule,
    SharedUiModule,
  ],
  declarations: [
    PokerOddsGameComponent,
    GuessBoxComponent,
    PlayButtonComponent,
    PokerTableComponent,
    CardComponent,
    PlayingHandComponent,
    PlayerHandBadgeComponent,
    BoardComponent,
    HandBadgeGridPositionPipe,
    HandIsVisiblePipe,
    GuessBoxAnswerMessagePipe,
    OpponentHandComponent,
    RevealedCardsToggleComponent,
  ],
  exports: [PokerTableComponent],
})
export class PokerOddsGameModule {}

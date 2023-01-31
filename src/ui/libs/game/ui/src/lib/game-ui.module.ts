import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LetModule, PushModule } from '@ngrx/component';
import { SharedUiModule } from '@ppo/shared/ui';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { GuessBoxAnswerMessagePipe } from './guess-box/guess-box-message.pipe';
import { GuessBoxComponent } from './guess-box/guess-box.component';
import { OpponentHandComponent } from './opponent-hand/opponent-hand.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { PlayingHandComponent } from './playing-hand/playing-hand.component';
import { GameUiComponent } from './game.component';
import { PokerOddsRoutingModule } from './game.routing.module';
import { HandBadgeGridPositionPipe } from './poker-table/handBadgeGridPosition.pipe';
import { HandIsVisiblePipe } from './poker-table/handIsVisible.pipe';
import { PokerTableComponent } from './poker-table/poker-table.component';
import { RevealedCardsToggleComponent } from './revealed-cards-toggle/revealed-cards-toggle.component';
import { PostRoundActionsComponent } from './post-round-actions/post-round-actions.component';
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
    GameUiComponent,
    GuessBoxComponent,
    PlayButtonComponent,
    PokerTableComponent,
    CardComponent,
    PlayingHandComponent,
    BoardComponent,
    HandBadgeGridPositionPipe,
    HandIsVisiblePipe,
    GuessBoxAnswerMessagePipe,
    OpponentHandComponent,
    RevealedCardsToggleComponent,
    PostRoundActionsComponent,
  ],
  exports: [PokerTableComponent],
})
export class GameUiModule {}

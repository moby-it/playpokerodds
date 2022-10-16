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
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, PokerOddsRoutingModule],
  declarations: [
    PokerOddsGameComponent,
    GuessBoxComponent,
    PlayButtonComponent,
    PokerTableComponent,
    CardComponent,
    PlayingHandComponent,
    PlayerHandBadgeComponent,
    BoardComponent,
  ],
  exports: [PokerTableComponent],
})
export class PokerOddsGameModule {}

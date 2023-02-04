import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LetModule, PushModule } from '@ngrx/component';
import { PokerTableModule, SharedUiModule } from '@ppo/shared/ui';
import { ExistingGameGuard } from './existing-game.guard';
import { GameUiComponent } from './game.component';
import { PokerOddsRoutingModule } from './game.routing.module';
import { GuessBoxComponent } from './guess-box/guess-box.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { PostRoundActionsComponent } from './post-round-actions/post-round-actions.component';
import { RevealedCardsToggleComponent } from './revealed-cards-toggle/revealed-cards-toggle.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PokerOddsRoutingModule,
    LetModule,
    PushModule,
    SharedUiModule,
    PokerTableModule,
  ],
  declarations: [
    GameUiComponent,
    GuessBoxComponent,
    PlayButtonComponent,
    RevealedCardsToggleComponent,
    PostRoundActionsComponent,
  ],
  exports: [],
  providers: [ExistingGameGuard],
})
export class GameUiModule {}

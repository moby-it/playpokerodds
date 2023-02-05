import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokerTableModule } from './poker-table/poker-table.module';
import { PokerTableComponent } from './poker-table/poker-table/poker-table.component';
import { CopyRoundLinkButtonComponent } from './poker-table/round-actions/copy-link/copy-link.component';
import { FavoriteButtonComponent } from './poker-table/round-actions/favorite/favorite.component';
import { PlayRoundButtonComponent } from './poker-table/round-actions/play/play-round.component';
import { RoundResultComponent } from './poker-table/round-result/round-result.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, PokerTableModule],
  exports: [
    PokerTableComponent,
    RoundResultComponent,
    CopyRoundLinkButtonComponent,
    FavoriteButtonComponent,
    PlayRoundButtonComponent,
  ],
})
export class RoundUiModule {}

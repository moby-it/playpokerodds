import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokerTableModule } from './poker-table/poker-table.module';
import { PokerTableComponent } from './poker-table/poker-table/poker-table.component';
import { RoundResultComponent } from './poker-table/round-result/round-result.component';

@NgModule({
  declarations: [RoundResultComponent],
  imports: [CommonModule, PokerTableModule],
  exports: [PokerTableComponent],
})
export class RoundUiModule {}

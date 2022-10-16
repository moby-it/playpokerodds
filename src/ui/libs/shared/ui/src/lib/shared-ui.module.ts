import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TooltipModule } from '@cloudfactorydk/ng2-tooltip-directive';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [TopBarComponent],
  exports: [TopBarComponent],
  imports: [CommonModule, TooltipModule, RouterModule],
})
export class SharedUiModule {}

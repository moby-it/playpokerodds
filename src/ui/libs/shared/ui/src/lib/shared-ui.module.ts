import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TooltipModule } from '@cloudfactorydk/ng2-tooltip-directive';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
@NgModule({
  declarations: [TopBarComponent, LoaderComponent],
  exports: [TopBarComponent, LoaderComponent],
  imports: [CommonModule, TooltipModule, RouterModule],
})
export class SharedUiModule {}

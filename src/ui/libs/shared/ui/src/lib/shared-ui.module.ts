import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from '@cloudfactorydk/ng2-tooltip-directive';
import { ClickOutsideDirective } from './directives/clickOutside.directive';
import { LoaderComponent } from './loader/loader.component';
@NgModule({
  declarations: [LoaderComponent, ClickOutsideDirective],
  exports: [LoaderComponent, ClickOutsideDirective],
  imports: [CommonModule, TooltipModule, RouterModule],
})
export class SharedUiModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { ClickOutsideDirective } from './directives/clickOutside.directive';
import { TooltipDirective } from './directives/tooltip.directive';
@NgModule({
  declarations: [
    ClickOutsideDirective,
    TooltipComponent,
    TooltipDirective,
  ],
  exports: [ClickOutsideDirective, TooltipDirective],
  imports: [CommonModule, RouterModule],
})
export class SharedUiModule { }

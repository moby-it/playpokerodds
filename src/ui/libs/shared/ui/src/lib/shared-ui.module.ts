import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { ClickOutsideDirective } from './directives/clickOutside.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { LoaderComponent } from './loader/loader.component';
import { GuessBoxAnswerMessagePipe } from './pipes';
@NgModule({
  declarations: [
    LoaderComponent,
    ClickOutsideDirective,
    TooltipComponent,
    TooltipDirective,
    GuessBoxAnswerMessagePipe,
  ],
  exports: [
    LoaderComponent,
    ClickOutsideDirective,
    TooltipDirective,
    GuessBoxAnswerMessagePipe,
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedUiModule {}

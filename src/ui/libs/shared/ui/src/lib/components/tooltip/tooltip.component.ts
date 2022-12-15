import { Component } from '@angular/core';
import { fadeAnimation } from '../../animations';

@Component({
  selector: 'ppo-tooltip',
  template: `<div
    @fade
    class="tooltip"
    [style.left]="left + 'px'"
    [style.top]="top + 'px'"
  >
    {{ tooltip }}
  </div>`,
  styleUrls: ['./tooltip.component.css'],
  animations: [fadeAnimation],
})
export class TooltipComponent {
  tooltip = '';
  left = 0;
  top = 0;
}

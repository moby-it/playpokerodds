import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TooltipOptions } from '@cloudfactorydk/ng2-tooltip-directive';
@Component({
  selector: 'ppo-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  tooltipOptions: TooltipOptions = {
    placement: 'bottom',
    tooltipClass: 'tooltip',
    animationDuration: 500,
    hideDelay: 0,
  };
  constructor(private router: Router) {}
  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}

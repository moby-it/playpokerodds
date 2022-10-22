import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TooltipOptions } from '@cloudfactorydk/ng2-tooltip-directive';
import { AuthFacade } from '@ppo/auth/data-access';
@Component({
  selector: 'ppo-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  constructor(private router: Router, private authFacade: AuthFacade) {}
  userFormVisible = false;
  username$ = this.authFacade.username$;
  tooltipOptions: TooltipOptions = {
    placement: 'bottom',
    tooltipClass: 'tooltip',
    animationDuration: 500,
    hideDelay: 0,
  };
  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
  toggleUserForm(): void {
    console.log('toggled');
    this.userFormVisible = !this.userFormVisible;
  }
}

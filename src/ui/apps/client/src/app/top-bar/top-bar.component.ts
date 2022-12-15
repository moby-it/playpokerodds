import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
  toggleUserForm(): void {
    this.userFormVisible = !this.userFormVisible;
    this.authFacade.clearErrorMessage();
  }
}

import { Component } from '@angular/core';
import { AuthFacade } from '@ppo/auth/domain';

@Component({
  selector: 'ppo-user-status',
  templateUrl: './user-status.component.html',
})
export class UserStatusComponent {
  hovering = false;
  userFormVisible = false;
  username$ = this.authFacade.username$;
  constructor(private authFacade: AuthFacade) {}
  toggleUserForm(): void {
    this.userFormVisible = !this.userFormVisible;
    this.authFacade.clearErrorMessage();
  }
  onMouseEnter(): void {
    this.hovering = true;
  }
  onMouseLeave(): void {
    this.hovering = false;
  }
}

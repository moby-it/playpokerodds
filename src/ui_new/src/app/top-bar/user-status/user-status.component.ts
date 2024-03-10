import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthStore } from '@app/auth/auth.store';
import { UserFormComponent } from "@app/user/ui/user-form";
import { take } from 'rxjs';
@Component({
  selector: 'ppo-user-status',
  imports: [UserFormComponent, RouterModule],
  templateUrl: './user-status.component.html',
  standalone: true
})
export class UserStatusComponent {
  hovering = false;
  userFormVisible = false;
  username = this.authStore.username;
  constructor(private authStore: AuthStore, private router: Router) { }
  toggleUserForm(): void {
    this.userFormVisible = !this.userFormVisible;
    this.authStore.clearErrorMessage();
  }
  navigateToProfile(): void {
    const username = this.username();
    if (username) {
      this.router.navigate(['/profile', username]);
    }
  }
  onMouseEnter(): void {
    this.hovering = true;
  }
  onMouseLeave(): void {
    this.hovering = false;
  }
}

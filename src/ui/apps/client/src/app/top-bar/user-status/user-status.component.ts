import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { AuthFacade } from '@ppo/auth/domain';
import { UserFormComponent } from "@ppo/auth/feature-user-form";
import { take } from 'rxjs';
@Component({
  selector: 'ppo-user-status',
  imports: [UserFormComponent, RouterModule, LetDirective],
  templateUrl: './user-status.component.html',
  standalone: true
})
export class UserStatusComponent {
  hovering = false;
  userFormVisible = false;
  username$ = this.authFacade.username$;
  constructor(private authFacade: AuthFacade, private router: Router) { }
  toggleUserForm(): void {
    this.userFormVisible = !this.userFormVisible;
    this.authFacade.clearErrorMessage();
  }
  navigateToProfile(): void {
    this.username$.pipe(take(1)).subscribe((username) => {
      this.router.navigate(['/profile', username]);
    });
  }
  onMouseEnter(): void {
    this.hovering = true;
  }
  onMouseLeave(): void {
    this.hovering = false;
  }
}

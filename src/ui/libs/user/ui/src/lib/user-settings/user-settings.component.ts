import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PushModule } from '@ngrx/component';
import { AuthFacade } from '@ppo/auth/domain';
import { tap } from 'rxjs';

@Component({
  selector: 'ppo-user-settings',
  templateUrl: './user-settings.component.html',
  standalone: true,
  imports: [PushModule, CommonModule],
})
export class UserSettingsComponent {
  constructor(private auth: AuthFacade) {
    this.auth.isLoggedIn$.pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          const router = inject(Router);
          router.navigate(['/']);
        }
      })
    );
  }
  currentUser$ = this.auth.user$;
}

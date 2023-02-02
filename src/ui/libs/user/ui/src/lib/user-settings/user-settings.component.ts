import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PushModule } from '@ngrx/component';
import { AuthFacade } from '@ppo/auth/domain';

@Component({
  selector: 'ppo-user-settings',
  templateUrl: './user-settings.component.html',
  standalone: true,
  imports: [PushModule, CommonModule],
})
export class UserSettingsComponent {
  constructor(private auth: AuthFacade) {}
  currentUser$ = this.auth.user$;
}

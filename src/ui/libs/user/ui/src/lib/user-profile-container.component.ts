import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PushModule } from '@ngrx/component';
import { AuthFacade } from '@ppo/auth/domain';
import { SideMenuComponent } from './side-menu/side-menu.component';
@Component({
  selector: 'ppo-user-profile-container',
  templateUrl: './user-profile-container.component.html',
  standalone: true,
  imports: [RouterModule, SideMenuComponent, PushModule],
})
export class UserProfileContainerComponent {
  constructor(private auth: AuthFacade) {}
  username$ = this.auth.username$;
}

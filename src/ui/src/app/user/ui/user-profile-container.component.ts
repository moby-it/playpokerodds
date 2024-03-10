import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileStore } from '@app/user/user-profile.store';
import { SideMenuComponent } from './side-menu/side-menu.component';
@Component({
  selector: 'ppo-user-profile-container',
  templateUrl: './user-profile-container.component.html',
  styles: [
    `
      .container {
        padding: 100px 24px 24px 24px;
      }
    `,
  ],
  standalone: true,
  imports: [RouterModule, SideMenuComponent],
})
export class UserProfileContainerComponent implements OnDestroy {
  constructor(private userProfile: UserProfileStore) { }
  username = this.userProfile.username;
  ngOnDestroy(): void {
    this.userProfile.reset();
  }
}

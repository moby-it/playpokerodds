import { Component } from '@angular/core';
import { UserProfileStore } from '@app/user/user-profile.store';

@Component({
  selector: 'ppo-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
        justify-content:center;
      }
    `,
  ],
})
export class ProfileComponent {
  constructor(private userProfileFacade: UserProfileStore) {}
  profile = this.userProfileFacade.profile;
}

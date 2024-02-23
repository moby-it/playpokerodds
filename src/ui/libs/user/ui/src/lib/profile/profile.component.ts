import { Component } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { UserProfileFacade } from '@ppo/user/domain';

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
  imports: [LetDirective],
})
export class ProfileComponent {
  constructor(private userProfileFacade: UserProfileFacade) {}
  profile$ = this.userProfileFacade.profile$;
}

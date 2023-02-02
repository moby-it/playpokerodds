import { Component } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { UserProfileFacade } from '@ppo/user/domain';

@Component({
  selector: 'ppo-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [LetModule],
})
export class ProfileComponent {
  constructor(private userProfileFacade: UserProfileFacade) {}
  profile$ = this.userProfileFacade.profile$;
}

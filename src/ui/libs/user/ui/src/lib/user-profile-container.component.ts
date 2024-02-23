import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { UserProfileFacade } from '@ppo/user/domain';
import { map } from 'rxjs';
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
  imports: [RouterModule, SideMenuComponent, PushPipe],
})
export class UserProfileContainerComponent implements OnDestroy {
  constructor(private userProfile: UserProfileFacade) {}
  username$ = this.userProfile.profile$.pipe(map((p) => p.username));
  ngOnDestroy(): void {
    this.userProfile.reset();
  }
}

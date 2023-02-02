import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PushModule } from '@ngrx/component';
import { AuthFacade } from '@ppo/auth/domain';
import { combineLatest, map, tap } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'ppo-user-profile-side-menu',
  templateUrl: './side-menu.component.html',
  standalone: true,
  imports: [RouterModule, PushModule, CommonModule],
})
export class SideMenuComponent {
  constructor(private authFacade: AuthFacade, private route: ActivatedRoute) {}
  showUserSettingsTab$ = combineLatest([
    this.authFacade.username$,
    this.route.params,
  ]).pipe(
    untilDestroyed(this),
    map(([username, params]) => username === params['username'])
  );
}

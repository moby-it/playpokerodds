import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { AuthFacade } from '@ppo/auth/domain';
import { combineLatest, map, tap } from 'rxjs';
@Component({
  selector: 'ppo-user-profile-side-menu',
  templateUrl: './side-menu.component.html',
  standalone: true,
  imports: [RouterModule, PushPipe, CommonModule],
})
export class SideMenuComponent {
  destroy = inject(DestroyRef);
  constructor(private authFacade: AuthFacade, private route: ActivatedRoute) { }
  showUserSettingsTab$ = combineLatest([
    this.authFacade.username$,
    this.route.params,
  ]).pipe(
    takeUntilDestroyed(),
    map(([username, params]) => username === params['username'])
  );
}

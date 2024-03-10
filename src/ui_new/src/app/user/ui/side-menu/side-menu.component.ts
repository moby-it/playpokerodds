import { CommonModule } from '@angular/common';
import { Component, DestroyRef, computed, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthStore } from '@app/auth/auth.store';
import { combineLatest, map, tap } from 'rxjs';
@Component({
  selector: 'ppo-user-profile-side-menu',
  templateUrl: './side-menu.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class SideMenuComponent {
  params = toSignal(this.route.params);
  constructor(private authStore: AuthStore, private route: ActivatedRoute) { }
  showUserSettingsTab = computed(() => {
    const params = this.params()
    if (!params) return false;
    return this.authStore.username() === params['username'];
  });
}

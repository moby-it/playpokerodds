import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Routes } from '@angular/router';
import { AuthStore } from '@app/auth/auth.store';
import { UserProfileStore } from '@app/user/user-profile.store';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, of, skipWhile, take } from 'rxjs';
import { FavoritesListComponent } from './ui/favorites-list/favorites-list.component';
import { HistoryListComponent } from './ui/history-list/history-list.component';
import { ProfileComponent } from './ui/profile/profile.component';
import { UserProfileContainerComponent } from './ui/user-profile-container.component';
import { UserSettingsComponent } from './ui/user-settings/user-settings.component';
import { toObservable } from '@angular/core/rxjs-interop';

export const profileRoutes: Routes = [
  {
    path: ':username',
    component: UserProfileContainerComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot): Observable<boolean> => {
        const router = inject(Router);
        const username = route.params['username'];
        const toaster = inject(ToastrService);

        if (!username) {
          router.navigate(['/']);
          return of(false);
        }
        const userProfileFacade = inject(UserProfileStore);
        userProfileFacade.fetchUserProfileByUsername(username);
        return toObservable(userProfileFacade.profile).pipe(
          skipWhile((p) => !p.username && !p.error),
          map((profile) => {
            if (profile.error) {
              throw new Error(profile.error);
            }
            return true;
          }),
          catchError((e: string) => {
            toaster.error(e);
            router.navigate(['/']);
            return of(false);
          })
        );
      },
    ],
    children: [
      { path: '', component: ProfileComponent, pathMatch: 'full' },
      { path: 'history', component: HistoryListComponent },
      { path: 'favorites', component: FavoritesListComponent },
      {
        path: 'user-settings',
        component: UserSettingsComponent,
        canActivate: [
          (route: ActivatedRouteSnapshot): boolean => {
            const loggedInUsername = inject(AuthStore).username;
            const requestedUsername = route.parent?.params['username'];
            return loggedInUsername() === requestedUsername;
          },
        ],
      },
    ],
  },
];

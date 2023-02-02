import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Routes } from '@angular/router';
import { AuthFacade } from '@ppo/auth/domain';
import { UserProfileFacade } from '@ppo/user/domain';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, of, skipWhile, take } from 'rxjs';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileContainerComponent } from './user-profile-container.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

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
        const userProfileFacade = inject(UserProfileFacade);
        userProfileFacade.fetchUserProfileByUsername(username);
        return userProfileFacade.profile$.pipe(
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
      { path: 'history', component: HistoryListComponent },
      { path: 'favorites', component: FavoritesListComponent },
      {
        path: 'user-settings',
        component: UserSettingsComponent,
        canActivate: [
          (route: ActivatedRouteSnapshot): Observable<boolean> => {
            const loggedInUsername$ = inject(AuthFacade).username$;
            const requestedUsername = route.parent?.params['username'];
            return loggedInUsername$.pipe(
              take(1),
              map((loggedInUsername) => loggedInUsername === requestedUsername)
            );
          },
        ],
      },
      { path: '', component: ProfileComponent },
    ],
  },
];

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Routes } from '@angular/router';
import { UserProfileFacade } from '@ppo/user/domain';
import { ca } from 'date-fns/locale';
import { catchError, map, Observable, of, skipWhile } from 'rxjs';
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
        if (!username) {
          router.navigate(['/']);
          return of(false);
        }
        const userProfileFacade = inject(UserProfileFacade);
        userProfileFacade.fetchUserProfileByUsername(username);
        return userProfileFacade.userProfile$.pipe(
          map((p) => p.username),
          skipWhile((p) => !p),
          map(() => {
            return true;
          }),
          catchError(() => of(false))
        );
      },
    ],
    children: [
      { path: 'history', component: HistoryListComponent },
      { path: 'favorites', component: FavoritesListComponent },
      { path: 'user-settings', component: UserSettingsComponent },
      { path: '', component: ProfileComponent },
    ],
  },
];

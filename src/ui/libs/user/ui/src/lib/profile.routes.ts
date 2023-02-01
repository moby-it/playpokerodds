import { Routes } from '@angular/router';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { UserProfileContainerComponent } from './user-profile-container.component';
import { ProfileComponent } from './profile/profile.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

export const profileRoutes: Routes = [
  {
    path: '',
    component: UserProfileContainerComponent,
    children: [
      { path: 'history', component: HistoryListComponent },
      { path: 'favorites', component: FavoritesListComponent },
      { path: 'user-settings', component: UserSettingsComponent },
      { path: '', component: ProfileComponent },
    ],
  },
];

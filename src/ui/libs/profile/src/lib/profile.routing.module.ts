import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { ProfileContainerComponent } from './profile-container.component';
import { ProfileComponent } from './profile/profile.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileContainerComponent,
    children: [
      { path: 'history', component: HistoryListComponent },
      { path: 'favorites', component: FavoritesListComponent },
      { path: 'user-settings', component: UserSettingsComponent },
      { path: '', component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}

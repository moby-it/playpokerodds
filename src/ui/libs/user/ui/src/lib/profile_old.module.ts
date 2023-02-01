import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileOldContainerComponent } from './profile-container.component';
import { ProfileOldComponent } from './profile/profile.component';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ProfileOldRoutingModule } from './profile.routing.module';

@NgModule({
  imports: [CommonModule, ProfileOldRoutingModule],
  declarations: [
    ProfileOldContainerComponent,
    ProfileOldComponent,
    FavoritesListComponent,
    HistoryListComponent,
    UserSettingsComponent,
  ],
})
export class ProfileOldModule {}

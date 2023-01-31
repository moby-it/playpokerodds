import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileContainerComponent } from './profile-container.component';
import { ProfileComponent } from './profile/profile.component';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ProfileRoutingModule } from './profile.routing.module';

@NgModule({
  imports: [CommonModule, ProfileRoutingModule],
  declarations: [
    ProfileContainerComponent,
    ProfileComponent,
    FavoritesListComponent,
    HistoryListComponent,
    UserSettingsComponent,
  ],
})
export class ProfileModule {}

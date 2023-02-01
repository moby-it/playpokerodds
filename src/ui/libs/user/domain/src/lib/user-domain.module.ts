import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userProfileFeature } from './+state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserProfileEffects } from './+state/effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(userProfileFeature),
    EffectsModule.forFeature(UserProfileEffects),
  ],
})
export class UserDomainModule {}

import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './+state/effects';
import { authFeature } from './+state/reducer';
import { AuthApiClient } from './auth.api-client.service';

@NgModule({
  imports: [
    StoreModule.forFeature(authFeature),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthApiClient],
})
export class AuthDataAccessModule {}

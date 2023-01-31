import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PokerOddsEffects } from './+state/effects';
import { pokerOddsFeature } from './+state/reducer';
import { GameApiClient } from './game.api-client.service';
@NgModule({
  imports: [
    StoreModule.forFeature(pokerOddsFeature),
    EffectsModule.forFeature([PokerOddsEffects]),
  ],
  providers: [GameApiClient],
})
export class GameDomainModule {}

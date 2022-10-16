import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthDataAccessModule } from '@ppo/auth/data-access';
import { PokerOddsDataAccessModule } from '@ppo/poker-odds/data-access';
import { SharedUiModule } from '@ppo/shared/ui';
import { API_URL } from '@ppo/shared/config';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { PushModule } from '@ngrx/component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PushModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SharedUiModule,
    AuthDataAccessModule,
    PokerOddsDataAccessModule,
  ],
  providers: [{ provide: API_URL, useValue: environment.apiUrl }],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from '@cloudfactorydk/ng2-tooltip-directive';
import { LetModule, PushModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthDataAccessModule } from '@ppo/auth/data-access';
import { AuthFeatureUserFormModule } from '@ppo/auth/feature-user-form';
import { PokerOddsDataAccessModule } from '@ppo/poker-odds/data-access';
import { API_URL } from '@ppo/shared/config';
import { SharedUiModule } from '@ppo/shared/ui';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { TokenInterceptor } from './interceptors';
import { TopBarComponent } from './top-bar/top-bar.component';
@NgModule({
  declarations: [AppComponent, TopBarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TooltipModule,
    PushModule,
    LetModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    PokerOddsDataAccessModule,
    AuthDataAccessModule,
    SharedUiModule,
    AuthFeatureUserFormModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 2000,
      closeButton: true,
    }), // ToastrModule added
  ],
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

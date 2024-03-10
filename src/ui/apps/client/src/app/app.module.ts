import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthDomainModule } from '@ppo/auth/domain';
import { PlayDomainModule } from '@ppo/play/domain';
import { SharedUiModule } from '@ppo/shared/ui';
import { UserDomainModule } from '@ppo/user/domain';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      connectInZone: true
    }),
    PlayDomainModule,
    AuthDomainModule,
    SharedUiModule,
    UserDomainModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
      closeButton: true,
    }), // ToastrModule added
  ],
})
export class AppModule { }

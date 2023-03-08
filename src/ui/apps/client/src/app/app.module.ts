import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LetModule, PushModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthDomainModule } from '@ppo/auth/domain';
import { AuthFeatureUserFormModule } from '@ppo/auth/feature-user-form';
import { PlayDomainModule } from '@ppo/play/domain';
import { API_URL } from '@ppo/shared/config';
import { SharedUiModule } from '@ppo/shared/ui';
import { UserDomainModule } from '@ppo/user/domain';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { GlobalErrorHandler } from './errorHandler';
import { FooterComponent } from './footer.component';
import { TokenInterceptor } from './interceptors';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UserStatusComponent } from './top-bar/user-status/user-status.component';
@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    UserStatusComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PushModule,
    LetModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    PlayDomainModule,
    AuthDomainModule,
    SharedUiModule,
    UserDomainModule,
    AuthFeatureUserFormModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
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
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

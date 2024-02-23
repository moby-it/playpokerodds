import { ErrorHandler, enableProdMode, importProvidersFrom } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { API_URL } from '@ppo/shared/config';
import { AppComponent } from './app/app.component';
import { GlobalErrorHandler } from './app/errorHandler';
import { TokenInterceptor } from './app/interceptors';
import { environment } from './environments/environment';
import { Routes, provideRouter, withRouterConfig } from '@angular/router';
import { AboutComponent } from './app/about/about.component';
import { HomepageComponent } from './app/homepage/homepage.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthDomainModule } from '@ppo/auth/domain';
import { PlayDomainModule } from '@ppo/play/domain';
import { SharedUiModule } from '@ppo/shared/ui';
import { UserDomainModule } from '@ppo/user/domain';
import { ToastrModule } from 'ngx-toastr';

if (environment.production) {
  enableProdMode();
}
const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
  },
  {
    path: 'play',
    loadComponent: () => import('@ppo/play/ui').then((m) => m.PlayComponent),
  },
  {
    path: 'leaderboards',
    loadChildren: () =>
      import('@ppo/leaderboards').then((m) => m.LeaderboardsModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('@ppo/user/ui').then((m) => m.profileRoutes),
  },
  {
    path: 'about',
    component: AboutComponent,
  },

  {
    path: '**',
    redirectTo: '/',
  },
];
bootstrapApplication(AppComponent, {
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideRouter(routes),
    importProvidersFrom([
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
      }),
    ]),
  ]
});

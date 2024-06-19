import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { GlobalErrorHandler } from './errorHandler';
import { API_URL } from './shared/config/apiUrl.token';
import { TokenInterceptor } from './token.interceptor';
import { BrowserAnimationsModule, provideAnimations } from "@angular/platform-browser/animations";
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
      closeButton: true,
    })
  ]
};

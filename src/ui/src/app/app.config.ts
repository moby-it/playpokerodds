import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { GlobalErrorHandler } from './errorHandler';
import { API_URL } from './shared/config/apiUrl.token';
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    { provide: API_URL, useValue: environment.apiUrl },
    provideHttpClient(withFetch()),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideRouter(routes),
    importProvidersFrom([
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        timeOut: 5000,
        closeButton: true,
      }),
    ]),
    provideClientHydration(),
  ]
};

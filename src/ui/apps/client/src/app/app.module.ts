import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthDataAccessModule } from '@gtop-ui/auth/data-access';
import { API_URL } from '@gtop-ui/shared/config';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { PushModule } from '@ngrx/component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    PushModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AuthDataAccessModule,
  ],
  providers: [{ provide: API_URL, useValue: environment.apiUrl }],
  bootstrap: [AppComponent],
})
export class AppModule {}

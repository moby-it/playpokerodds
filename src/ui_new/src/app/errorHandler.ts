import { HttpClient } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { API_URL } from './shared/config/apiUrl.token';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  http = inject(HttpClient);
  apiUrl = inject(API_URL);
  handleError(error: Error): void {
    console.error(error);
    this.http
      .post<void>(
        `${this.apiUrl}/health/logError`,
        { payload: error.message },
        { observe: 'response', responseType: 'text' as 'json' }
      )
      .subscribe();
  }
}

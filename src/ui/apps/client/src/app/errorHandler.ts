import { HttpClient } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { API_URL } from '@ppo/shared/config';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  http = inject(HttpClient);
  apiUrl = inject(API_URL);
  handleError(error: Error): void {
    this.http
      .post<void>(
        `${this.apiUrl}/health/logError`,
        { payload: error.message },
        { observe: 'response', responseType: 'text' as 'json' }
      )
      .subscribe();
  }
}

import {
  HttpInterceptorFn
} from '@angular/common/http';
import { BEARER_TOKEN_STORAGE_KEY } from './shared/config/bearerToken';


export const TokenInterceptor: HttpInterceptorFn = (request, next) => {
  console.log('inside token interceptor');

  const token = document.cookie.split(';')

  if (token) {
    // If we have a token, we set it to the header
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(request);
};


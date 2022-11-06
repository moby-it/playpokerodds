import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment';
export interface AuthPayload {
  email: string;
  password: string;
}
export enum AuthStatus {
  UNAUTHENTICATED,
  AUTHENTICATED,
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _status$ = new BehaviorSubject(AuthStatus.UNAUTHENTICATED);
  private _error$ = new BehaviorSubject('');
  status$ = this._status$.asObservable().pipe(distinctUntilChanged());
  error$ = this._error$.asObservable();
  get isLoggedIn(): boolean {
    return this._status$.getValue() === AuthStatus.AUTHENTICATED;
  }
  constructor(private http: HttpClient, private router: Router) {
    this.status$.subscribe((status) => {
      if (status === AuthStatus.AUTHENTICATED) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  private setStatus = (status: AuthStatus): void => this._status$.next(status);
  login(payload: AuthPayload): void {
    this.http
      .post<{ token: string }>(
        environment.apiUrl + '/auth/admin-login',
        payload
      )
      .subscribe({
        next: (response) => {
          this.setToken(response.token);
          this.setStatus(AuthStatus.AUTHENTICATED);
        },
        error: (error: HttpErrorResponse) => {
          this._error$.next(
            error.error?.message ?? 'Unexpected authentication error.'
          );
          return EMPTY;
        },
      });
  }
  private setToken(token: string): void {
    localStorage.setItem('TOKEN', token);
  }
}

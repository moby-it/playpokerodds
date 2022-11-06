import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, EMPTY, map } from 'rxjs';
import { environment } from '../../environments/environment';
export interface AuthPayload {
  email: string;
  password: string;
}
export enum AuthStatus {
  UNAUTHENTICATED,
  AUTHENTICATED,
}
export enum Roles {
  Unknown,
  Superuser = 1,
  Admin,
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _status$ = new BehaviorSubject(AuthStatus.UNAUTHENTICATED);
  private _error$ = new BehaviorSubject('');
  private _role$ = new BehaviorSubject(Roles.Unknown);
  status$ = this._status$.asObservable().pipe(distinctUntilChanged());
  error$ = this._error$.asObservable();
  role$ = this._role$.asObservable();
  isAdmin$ = this.role$.pipe(map((r) => r === Roles.Admin));
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
      .post<{ token: string; role: Roles }>(
        environment.apiUrl + '/auth/admin-login',
        payload
      )
      .subscribe({
        next: (response) => {
          this.setRole(response.role);
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
  private setRole(role: Roles): void {
    this._role$.next(role);
  }
}

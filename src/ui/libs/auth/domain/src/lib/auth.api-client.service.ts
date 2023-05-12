import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@ppo/shared/config';
import { Observable } from 'rxjs';
import {
  AuthResposeDto, RegisterDto,
  SigninDto
} from './dtos';
declare let gtag: (
  action: string,
  eventName: string,
  options?: unknown
) => void;
@Injectable()
export class AuthApiClient {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) { }
  register(dto: RegisterDto): Observable<AuthResposeDto> {
    if (gtag)
      gtag('event', 'user_registered');
    return this.http.post<AuthResposeDto>(`${this.apiUrl}/auth/register`, dto);
  }
  signin(dto: SigninDto): Observable<AuthResposeDto> {
    if (gtag)
      gtag('event', 'user_signin');
    return this.http.post<AuthResposeDto>(`${this.apiUrl}/auth/login`, dto);
  }
  refreshToken(): Observable<AuthResposeDto> {
    if (gtag)
      gtag('event', 'session_refreshed');
    return this.http.get<AuthResposeDto>(`${this.apiUrl}/auth/refreshToken`);
  }
}

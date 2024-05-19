import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@app/shared/config/apiUrl.token';
import { Observable } from 'rxjs';
import {
  AuthResposeDto, RegisterDto,
  SigninDto
} from './user.dto';

@Injectable({ providedIn: 'root' })
export class AuthApiClient {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) { }
  register(dto: RegisterDto): Observable<AuthResposeDto> {
    return this.http.post<AuthResposeDto>(`${this.apiUrl}/auth/register`, dto);
  }
  signin(dto: SigninDto): Observable<AuthResposeDto> {
    return this.http.post<AuthResposeDto>(`${this.apiUrl}/auth/login`, dto, { withCredentials: true });
  }
  refreshToken(): Observable<AuthResposeDto> {
    return this.http.get<AuthResposeDto>(`${this.apiUrl}/auth/refreshToken`, { withCredentials: true });
  }
}

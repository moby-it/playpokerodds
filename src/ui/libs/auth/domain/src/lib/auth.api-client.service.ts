import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@ppo/shared/config';
import { Observable } from 'rxjs';
import {
  AuthResposeDto, RegisterDto,
  SigninDto
} from './dtos';

@Injectable()
export class AuthApiClient {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) { }
  register(dto: RegisterDto): Observable<AuthResposeDto> {
    return this.http.post<AuthResposeDto>(`${this.apiUrl}/auth/register`, dto);
  }
  signin(dto: SigninDto): Observable<AuthResposeDto> {
    return this.http.post<AuthResposeDto>(`${this.apiUrl}/auth/login`, dto);
  }
  refreshToken(): Observable<AuthResposeDto> {
    return this.http.get<AuthResposeDto>(`${this.apiUrl}/auth/refreshToken`);
  }
}

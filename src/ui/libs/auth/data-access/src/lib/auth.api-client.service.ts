import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@ppo/shared/config';
import { isLeft } from 'fp-ts/es6/Either';
import { Observable, tap } from 'rxjs';
import { AuthDto, UserResposeDto } from './dtos';
@Injectable()
export class AuthApiClient {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}
  register(dto: AuthDto): Observable<UserResposeDto> {
    return this.http
      .post<UserResposeDto>(`${this.apiUrl}/auth/register`, dto)
      .pipe(
        tap((response) => {
          const decodedResponse = UserResposeDto.decode(response);
          if (isLeft(decodedResponse)) {
            throw new Error(decodedResponse.left.toString());
          }
        })
      );
  }
  login(dto: AuthDto): Observable<UserResposeDto> {
    return this.http
      .post<UserResposeDto>(`${this.apiUrl}/auth/login`, dto)
      .pipe(
        tap((response) => {
          const decodedResponse = UserResposeDto.decode(response);
          if (isLeft(decodedResponse)) {
            throw new Error(decodedResponse.left.toString());
          }
        })
      );
  }
}

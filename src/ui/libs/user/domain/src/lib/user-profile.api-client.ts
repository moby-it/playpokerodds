import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@ppo/shared/config';
import { Observable } from 'rxjs';
import { UpdateUserDto, UserResposeDto } from './models';
import { UserProfile } from './models/userProfile';

@Injectable({ providedIn: 'root' })
export class UserProfileApiClient {
  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
  ) {}
  fetchUserProfileByUsername(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      `${this.apiUrl}/user/fetchByUsername/${username}`
    );
  }
  updateUser(dto: Partial<UpdateUserDto>): Observable<UserResposeDto> {
    return this.http.put<UserResposeDto>(`${this.apiUrl}/user/update`, dto);
  }
}

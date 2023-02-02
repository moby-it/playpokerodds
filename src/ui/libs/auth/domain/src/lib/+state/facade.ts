import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BEARER_TOKEN_STORAGE_KEY } from '@ppo/shared/config';
import { map } from 'rxjs';
import { AuthStatus } from '../..';
import { RegisterDto, SigninDto } from '../dtos';
import { AuthActions } from './actions';
import {
  selectErrorMessage,
  selectStatus,
  selectUser,
  selectUsername
} from './reducer';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  constructor(private store: Store) {
    if (localStorage.getItem(BEARER_TOKEN_STORAGE_KEY)) {
      this.store.dispatch(AuthActions.refresh());
    }
    localStorage.clear();
  }
  user$ = this.store.select(selectUser);
  username$ = this.store.select(selectUsername);
  status$ = this.store.select(selectStatus);
  isLoggedIn$ = this.status$.pipe(
    map((status) => status === AuthStatus.AUTHORIZED)
  );
  errorMessage$ = this.store.select(selectErrorMessage);
  signin(dto: SigninDto): void {
    this.store.dispatch(AuthActions.signin(dto));
  }
  register(dto: RegisterDto): void {
    this.store.dispatch(AuthActions.register(dto));
  }

  clearErrorMessage(): void {
    this.store.dispatch(AuthActions.setErrorMessage({ message: '' }));
  }
}

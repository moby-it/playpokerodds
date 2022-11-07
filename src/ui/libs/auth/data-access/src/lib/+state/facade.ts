import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BEARER_TOKEN_STORAGE_KEY } from '@ppo/shared/config';
import { isRight } from 'fp-ts/es6/Either';
import { map } from 'rxjs';
import { AuthStatus } from '../..';
import { EditUserDto, RegisterDto, SigninDto } from '../dtos';
import { AuthActions } from './actions';
import {
  selectErrorMessage,
  selectStatus,
  selectUser,
  selectUsername,
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
    if (isRight(SigninDto.decode(dto)))
      this.store.dispatch(AuthActions.signin(dto));
  }
  register(dto: RegisterDto): void {
    if (isRight(RegisterDto.decode(dto)))
      this.store.dispatch(AuthActions.register(dto));
  }
  changeUsername(dto: EditUserDto): void {
    if (isRight(EditUserDto.decode(dto)))
      this.store.dispatch(AuthActions.changeUsername(dto));
  }
  clearErrorMessage(): void {
    this.store.dispatch(AuthActions.setErrorMessage({ message: '' }));
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { isRight } from 'fp-ts/es6/Either';
import { AuthDto } from '../dtos';
import { AuthActions } from './actions';
import { selectStatus, selectUser } from './reducer';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  constructor(private store: Store) {}
  user$ = this.store.select(selectUser);
  status$ = this.store.select(selectStatus);
  signin(dto: AuthDto): void {
    if (isRight(AuthDto.decode(dto)))
      this.store.dispatch(AuthActions.signin(dto));
  }
  register(dto: AuthDto): void {
    if (isRight(AuthDto.decode(dto)))
      this.store.dispatch(AuthActions.register(dto));
  }
  editUser(dto: unknown): void {
    throw new Error('not yet implemented');
  }
}

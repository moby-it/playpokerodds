import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthDto } from '../dtos';
import { AuthActions } from './actions';
import { selectStatus, selectUser } from './reducer';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  constructor(private store: Store) {}
  user$ = this.store.select(selectUser);
  status$ = this.store.select(selectStatus);
  login(dto: AuthDto): void {
    this.store.dispatch(AuthActions.login(dto));
  }
  register(dto: AuthDto): void {
    this.store.dispatch(AuthActions.register(dto));
  }
}

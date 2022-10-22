import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComponentStore } from '@ngrx/component-store';
import { AuthFacade, AuthStatus } from '@ppo/auth/data-access';
import { Observable, tap, withLatestFrom } from 'rxjs';
export enum FormType {
  REGISTER,
  SIGN_IN,
  EDIT_USER,
}
interface UserFormState {
  formType: FormType;
}
const initialState: UserFormState = {
  formType: FormType.REGISTER,
};
@Injectable()
export class UserFormStore extends ComponentStore<UserFormState> {
  formType$ = this.select((state) => state.formType);
  private updateFormType = this.updater((state, formType: FormType) => ({
    ...state,
    formType,
  }));
  constructor(private authFacade: AuthFacade) {
    super(initialState);
    authFacade.status$
      .pipe(
        tap((status) => {
          switch (status) {
            case AuthStatus.AUTHORIZED:
              this.updateFormType(FormType.EDIT_USER);
          }
        })
      )
      .subscribe();
  }
  toSignIn = this.effect((source$: Observable<void>) =>
    source$.pipe(tap(() => this.updateFormType(FormType.SIGN_IN)))
  );
  toRegister = this.effect((source$: Observable<void>) =>
    source$.pipe(tap(() => this.updateFormType(FormType.REGISTER)))
  );
  submit$ = this.effect((source$: Observable<FormGroup>) =>
    source$.pipe(
      withLatestFrom(this.formType$),
      tap(([formGroup, formType]) => {
        switch (formType) {
          case FormType.REGISTER:
            this.authFacade.register(formGroup.value);
            break;
          case FormType.SIGN_IN:
            this.authFacade.signin(formGroup.value);
            break;
          case FormType.EDIT_USER:
            this.authFacade.editUser(formGroup.value);
            break;
        }
      })
    )
  );
}

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComponentStore } from '@ngrx/component-store';
import { AuthFacade, AuthStatus } from '@ppo/auth/domain';
import { Observable, tap, withLatestFrom } from 'rxjs';
export enum FormType {
  REGISTER,
  SIGN_IN,
  NONE,
}
interface UserFormState {
  formType: FormType;
}
const initialState: UserFormState = {
  formType: FormType.SIGN_IN,
};
@Injectable()
export class UserFormStore extends ComponentStore<UserFormState> {
  formType$ = this.select((state) => state.formType);
  authError$ = this.authFacade.errorMessage$;

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
              this.updateFormType(FormType.NONE);
          }
        })
      )
      .subscribe();
  }
  toSignIn = this.effect((source$: Observable<void>) =>
    source$.pipe(
      tap(() => this.updateFormType(FormType.SIGN_IN)),
      tap(() => this.authFacade.clearErrorMessage())
    )
  );
  toRegister = this.effect((source$: Observable<void>) =>
    source$.pipe(
      tap(() => this.updateFormType(FormType.REGISTER)),
      tap(() => this.authFacade.clearErrorMessage())
    )
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
        }
      })
    )
  );
}

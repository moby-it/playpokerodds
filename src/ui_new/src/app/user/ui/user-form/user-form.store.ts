import { Injectable, effect } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthStatus, AuthStore } from '@app/auth/auth.store';
import { SignalStore } from '@app/shared/signal-store';
import { produce } from 'immer';
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
export class UserFormStore extends SignalStore<UserFormState>{
  formType = this.select((state) => state.formType);
  authError = this.authStore.errorMessage;

  updateFormType(formType: FormType) {
    this.setState(produce(this.state, state => { state.formType = formType; }));
  }
  constructor(private authStore: AuthStore) {
    super(initialState);
    effect(() => {
      if (this.authStore.status() === AuthStatus.AUTHORIZED) {
        this.updateFormType(FormType.NONE);
      }
    });
  }
  toSignIn() {
    this.updateFormType(FormType.SIGN_IN);
    this.authStore.clearErrorMessage();
  }
  toRegister() {
    this.updateFormType(FormType.REGISTER);
    this.authStore.clearErrorMessage();
  }
  async submit(form: FormGroup) {
    let result: boolean = false;
    switch (this.formType()) {
      case FormType.REGISTER:
        result = await this.authStore.register(form.value);
        break;
      case FormType.SIGN_IN:
        result = await this.authStore.signin(form.value);
        break;
    }
    if (result) this.updateFormType(FormType.NONE);
  }
}

import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComponentStore } from '@ngrx/component-store';
export interface UserForm {
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
}
interface FormError {
  controlName: string;
  message: string;
}
interface UserFormState {
  isSignIn: boolean;
  errors: FormError[];
}
const initialState: UserFormState = {
  isSignIn: false,
  errors: [],
};
@Injectable()
export class UserFormStore extends ComponentStore<UserFormState> {
  userForm = new FormGroup<UserForm>({
    email: new FormControl(),
    password: new FormControl(),
    username: new FormControl(),
  });
  constructor() {
    super(initialState);
  }
}

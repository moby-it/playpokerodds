import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserFormStore } from '../user-form.store';
export interface SigninForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
@Component({
  selector: 'ppo-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css'],
})
export class SigninFormComponent {
  constructor(private componentStore: UserFormStore) {}
  signinForm = new FormGroup<SigninForm>({
    email: new FormControl(),
    password: new FormControl(),
  });
  onSubmit() {
    console.log('register form', this.signinForm.value);
  }
  toRegisterInForm() {
    this.componentStore.toRegister();
  }
}

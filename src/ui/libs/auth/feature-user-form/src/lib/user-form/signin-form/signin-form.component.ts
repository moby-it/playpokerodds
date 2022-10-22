import { Component } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';
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
  constructor(
    private componentStore: UserFormStore,
    private fb: NonNullableFormBuilder
  ) {}
  signinForm = this.fb.group<SigninForm>({
    email: this.fb.control('', { validators: Validators.required }),
    password: this.fb.control('', { validators: Validators.required }),
  });
  formInvalid$ = this.signinForm.statusChanges.pipe(
    map((status) => status === 'INVALID')
  );
  onSubmit(): void {
    this.componentStore.submit$(this.signinForm);
  }
  toRegisterInForm(): void {
    this.componentStore.toRegister();
  }
}

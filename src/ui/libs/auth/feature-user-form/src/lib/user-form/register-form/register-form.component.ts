import { Component } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import { UserFormStore } from '../user-form.store';
interface RegisterForm {
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
}
@Component({
  selector: 'ppo-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  constructor(
    private componentStore: UserFormStore,
    private fb: NonNullableFormBuilder
  ) {}
  registerForm = this.fb.group<RegisterForm>({
    email: this.fb.control('', { validators: Validators.required }),
    username: this.fb.control('', { validators: Validators.required }),
    password: this.fb.control('', { validators: Validators.required }),
  });
  formInvalid$ = this.registerForm.statusChanges.pipe(
    map((status) => status === 'INVALID')
  );
  onSubmit(): void {
    this.componentStore.submit$(this.registerForm);
  }
  toSignInForm(): void {
    this.componentStore.toSignIn();
  }
}

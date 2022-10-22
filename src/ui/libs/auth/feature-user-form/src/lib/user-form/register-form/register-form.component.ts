import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(private componentStore: UserFormStore) {}
  registerForm = new FormGroup<RegisterForm>({
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
  });
  onSubmit() {
    console.log('register form', this.registerForm.value);
  }
  toSignInForm() {
    this.componentStore.toSignIn();
  }
}

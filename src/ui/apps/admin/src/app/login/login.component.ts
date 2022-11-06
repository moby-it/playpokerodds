import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ppo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private store: AuthService, private fb: NonNullableFormBuilder) {}
  error$ = this.store.error$;
  form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });
  submit(): void {
    if (this.form.valid) {
      this.store.login(this.form.getRawValue());
    }
  }
}

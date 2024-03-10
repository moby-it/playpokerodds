import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { distinctUntilChanged, map, startWith } from 'rxjs';
import { UserFormStore } from '../user-form.store';
import { PushPipe } from '@ngrx/component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'ppo-register-form',
  templateUrl: './register-form.component.html',
  imports: [ReactiveFormsModule, PushPipe, CommonModule],
  standalone: true
})
export class RegisterFormComponent {
  constructor(
    private componentStore: UserFormStore,
    private fb: NonNullableFormBuilder
  ) { }
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  formInvalid$ = this.registerForm.statusChanges.pipe(
    startWith(this.registerForm.status),
    distinctUntilChanged(),
    map((status) => status === 'INVALID')
  );
  onSubmit(): void {
    this.componentStore.submit$(this.registerForm);
  }
  toSignInForm(): void {
    this.componentStore.toSignIn();
  }
}

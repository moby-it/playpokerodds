import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { UserFormStore } from '../user-form.store';
import { PushPipe } from '@ngrx/component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'ppo-signin-form',
  templateUrl: './signin-form.component.html',
  imports: [PushPipe, CommonModule, ReactiveFormsModule],
  standalone: true
})
export class SigninFormComponent {
  constructor(
    private componentStore: UserFormStore,
    private fb: NonNullableFormBuilder
  ) { }
  signinForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  formInvalid$ = this.signinForm.statusChanges.pipe(
    startWith(this.signinForm.status),
    map((status) => status === 'INVALID')
  );
  onSubmit(): void {
    this.componentStore.submit$(this.signinForm);
  }
  toRegisterInForm(): void {
    this.componentStore.toRegister();
  }
}

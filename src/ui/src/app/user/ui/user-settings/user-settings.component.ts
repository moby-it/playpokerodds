import { CommonModule, NgIf } from '@angular/common';
import { Component, effect } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthStore } from '@app/auth/auth.store';
import { UserProfileStore } from '@app/user/user-profile.store';
@Component({
  selector: 'ppo-user-settings',
  templateUrl: './user-settings.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf
  ],
})
export class UserSettingsComponent {
  form:
    | FormGroup<{
      email: FormControl<string>;
      username: FormControl<string>;
      password: FormControl<string>;
    }>
    | undefined;

  constructor(
    private authStore: AuthStore,
    private fb: NonNullableFormBuilder,
    private userProfile: UserProfileStore,
    private router: Router
  ) {
    const user = this.authStore.user();
    if (user) {
      this.form = this.fb.group({
        email: [user.email, [Validators.email]],
        username: [user.username, [Validators.required]],
        password: ['', Validators.required],
      });
      this.form.disable();
    }
    effect(() => {
      if (!this.authStore.user()) {
        this.router.navigate(['/']);
        return;
      }
    });
  }
  error = this.userProfile.error;

  currentUser = this.authStore.user;
  enableFormField(controlName: string): void {
    if (this.form?.get(controlName)?.enabled) {
      this.form?.get(controlName)?.disable();
    } else {
      this.form?.disable();
      this.form?.get(controlName)?.enable();
    }
  }
  submit(): void {
    if (this.form?.value) this.userProfile.updateUser(this.form.getRawValue());
  }
  logout(): void {
    this.authStore.logout();
  }
}

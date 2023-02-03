import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule, PushModule } from '@ngrx/component';
import { AuthFacade } from '@ppo/auth/domain';
import { UserProfileFacade } from '@ppo/user/domain';
import { tap } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'ppo-user-settings',
  templateUrl: './user-settings.component.html',
  standalone: true,
  imports: [
    PushModule,
    CommonModule,
    ReactiveFormsModule,
    LetModule,
    RouterModule,
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
    private auth: AuthFacade,
    private fb: NonNullableFormBuilder,
    private userProfile: UserProfileFacade,
    private router: Router
  ) {
    this.auth.user$
      .pipe(
        untilDestroyed(this),
        tap((user) => {
          if (!user) {
            this.router.navigate(['/']);
            return;
          }
          this.router.navigate(['/profile', user.username, 'user-settings']);
          this.form = this.fb.group({
            email: [user.email, [Validators.email]],
            username: [user.username, [Validators.required]],
            password: ['', Validators.required],
          });
          this.form.disable();
        })
      )
      .subscribe();
  }
  error$ = this.userProfile.error$;

  currentUser$ = this.auth.user$;
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
    this.auth.logout();
  }
}

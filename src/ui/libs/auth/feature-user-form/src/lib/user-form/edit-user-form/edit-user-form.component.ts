import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthFacade } from '@ppo/auth/domain';
import { filter, map, tap } from 'rxjs';
import { UserFormStore } from '../user-form.store';

@UntilDestroy()
@Component({
  selector: 'ppo-edit-user-form',
  templateUrl: './edit-user-form.component.html',
})
export class EditUserFormComponent implements OnInit {
  constructor(
    private authFacade: AuthFacade,
    private fb: NonNullableFormBuilder,
    private componentStore: UserFormStore
  ) {}

  editUserForm = this.fb.group({
    username: ['', Validators.required],
  });
  formInvalid$ = this.editUserForm.statusChanges.pipe(
    map((status) => status === 'INVALID')
  );
  ngOnInit(): void {
    this.authFacade.username$
      .pipe(
        filter(Boolean),
        tap((username) => {
          this.editUserForm.patchValue({ username });
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
  onSubmit(): void {
    this.componentStore.submit$(this.editUserForm);
  }
}

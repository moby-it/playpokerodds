import { Component, EventEmitter, Output } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { FormType, UserFormStore } from './user-form.store';
import { SigninFormComponent } from './signin-form';
import { RegisterFormComponent } from './register-form';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'ppo-user-form',
  templateUrl: './user-form.component.html',
  imports: [SigninFormComponent, RegisterFormComponent, LetDirective],
  providers: [UserFormStore],
  standalone: true
})
export class UserFormComponent {
  @Output() clickedOutside = new EventEmitter();
  constructor(private componentStore: UserFormStore) { }
  private formType$ = this.componentStore.formType$;
  private error$ = this.componentStore.authError$;
  formTypes = FormType;

  vm$ = combineLatest([this.formType$, this.error$]).pipe(
    map(([formType, error]) => ({ formType, error }))
  );
}

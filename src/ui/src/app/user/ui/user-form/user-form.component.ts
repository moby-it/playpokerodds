import { Component, EventEmitter, Output, computed } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { FormType, UserFormStore } from './user-form.store';
import { SigninFormComponent } from './signin-form';
import { RegisterFormComponent } from './register-form';

@Component({
  selector: 'ppo-user-form',
  templateUrl: './user-form.component.html',
  imports: [SigninFormComponent, RegisterFormComponent],
  providers: [UserFormStore],
  standalone: true
})
export class UserFormComponent {
  @Output() clickedOutside = new EventEmitter();
  constructor(private componentStore: UserFormStore) { }
  private formType = this.componentStore.formType;
  private error = this.componentStore.authError;
  formTypes = FormType;
  vm = computed(() => ({
    formType: this.formType(),
    error: this.error()
  }));
}

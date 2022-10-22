import { Component, EventEmitter, Output } from '@angular/core';
import { FormType, UserFormStore } from './user-form.store';

@Component({
  selector: 'ppo-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  providers: [UserFormStore],
})
export class UserFormComponent {
  @Output() clickedOutside = new EventEmitter();
  formTypes = FormType;
  constructor(private componentStore: UserFormStore) {}
  formType$ = this.componentStore.formType$;
}

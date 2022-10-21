import { Component } from '@angular/core';
import { UserFormStore } from './user-form.store';

@Component({
  selector: 'ppo-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  providers: [UserFormStore],
})
export class UserFormComponent {
  constructor(private componentStore: UserFormStore) {}
  userForm = this.componentStore.userForm;
  onSubmit() {
    console.log(this.userForm.value);
  }
}

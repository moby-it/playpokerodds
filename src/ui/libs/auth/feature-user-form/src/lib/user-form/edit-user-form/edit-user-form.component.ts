import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
interface EditUserForm {
  username: FormControl<string>;
}
@Component({
  selector: 'ppo-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css'],
})
export class EditUserFormComponent {
  editUserForm = new FormGroup<EditUserForm>({
    username: new FormControl(),
  });
  onSubmit() {
    console.log('register form', this.editUserForm.value);
  }
}

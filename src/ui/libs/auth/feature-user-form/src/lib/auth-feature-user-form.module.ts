import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LetModule, PushModule } from '@ngrx/component';
import {
  UserFormComponent,
  RegisterFormComponent,
  SigninFormComponent,
  EditUserFormComponent,
} from './user-form';

@NgModule({
  declarations: [
    UserFormComponent,
    RegisterFormComponent,
    SigninFormComponent,
    EditUserFormComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, LetModule, PushModule],
  exports: [UserFormComponent],
})
export class AuthFeatureUserFormModule {}

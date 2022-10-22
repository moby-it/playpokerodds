import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LetModule, PushModule } from '@ngrx/component';
import { SharedUiModule } from '@ppo/shared/ui';
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
  imports: [CommonModule, ReactiveFormsModule, LetModule, PushModule, SharedUiModule],
  exports: [UserFormComponent],
})
export class AuthFeatureUserFormModule {}

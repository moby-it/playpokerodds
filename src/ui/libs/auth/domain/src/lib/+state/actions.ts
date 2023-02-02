import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterDto, SigninDto } from '../dtos';
import { User } from '../models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Set Error Message': props<{ message: string }>(),
    'Set User': props<{ user: User }>(),
    Refresh: emptyProps(),
    Signin: props<SigninDto>(),
    Register: props<RegisterDto>(),
    Logout: emptyProps(),
  },
});

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthDto } from '../dtos';
import { User } from '../models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Set Error Message': props<{ message: string }>(),
    'Set User': props<{ user: User }>(),
    Refresh: emptyProps(),
    Signin: props<AuthDto>(),
    Register: props<AuthDto>(),
    Logout: emptyProps(),
  },
});

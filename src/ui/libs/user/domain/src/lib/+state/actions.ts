import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UpdateUserDto } from '../dtos';
import { UserProfile } from '../dtos/userProfile.dto';

export const userProfileActions = createActionGroup({
  source: 'userProfule',
  events: {
    reset: emptyProps(),
    'fetch User Profile': props<{ username: string }>(),
    'set Error': props<{ message: string }>(),
    'set User Profile': props<{ userProfile: UserProfile }>(),
    'update User Profile': props<{ dto: Partial<UpdateUserDto> }>(),
    EMPTY: emptyProps(),
  },
});

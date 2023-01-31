import { Round } from '@moby-it/ppo-core';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RoundAnswer, UserScore } from '../dtos';

export const pokerOddsActions = createActionGroup({
  source: 'pokerOdds',
  events: {
    'set Loading': props<{ loading: boolean }>(),
    'fetch Existing Round': props<{ id: string }>(),
    'set Round Id': props<{ id: string }>(),
    'start new Round': emptyProps(),
    'set Current Round': props<{ round: Round }>(),
    'set Round Answer': props<{ answer: RoundAnswer }>(),
    'add Round To Favorites': props<{ roundId: string }>(),
    'remove Round From Favorites': props<{ roundId: string }>(),
    'answer Round': props<{ estimate: number }>(),
    'fetch Leaderboards': emptyProps(),
    'set Leaderboards': props<{ scores: UserScore[] }>(),
    'toggle play with Revealed Cards': emptyProps(),
    reset: emptyProps(),
    EMPTY: emptyProps(),
  },
});

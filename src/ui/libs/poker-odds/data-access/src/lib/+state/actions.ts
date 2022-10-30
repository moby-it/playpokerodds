import { Round, RoundAnswerDto } from '@moby-it/ppo-core';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserScore } from '../dtos';

export const pokerOddsActions = createActionGroup({
  source: 'pokerOdds',
  events: {
    'set Loading': props<{ loading: boolean }>(),
    'start new Round': emptyProps(),
    'set Current Round': props<{ round: Round }>(),
    'set Round Answer': props<{ answer: RoundAnswerDto }>(),
    'answer Round': props<{ estimate: number }>(),
    'fetch Leaderboards': emptyProps(),
    'set Leaderboards': props<{ scores: UserScore[] }>(),
    reset: emptyProps(),
  },
});

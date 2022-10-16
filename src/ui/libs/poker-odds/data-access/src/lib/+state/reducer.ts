import { Round, RoundAnswerDto } from '@moby-it/ppo-core';
import { createFeature, createReducer, on } from '@ngrx/store';
import { pokerOddsActions } from './actions';
interface PokerOddsGameState {
  loading: boolean;
  round: Round | null;
  estimate: number | null;
  answer: RoundAnswerDto | null;
}
const initialState: PokerOddsGameState = {
  loading: false,
  round: null,
  estimate: null,
  answer: null,
};
export const pokerOddsFeature = createFeature({
  name: 'Poker Odds',
  reducer: createReducer(
    initialState,
    on(pokerOddsActions.setLoading, (state, action) => ({
      ...state,
      loading: action.loading,
    })),
    on(pokerOddsActions.startNewRound, (state) => ({
      ...state,
      answer: null,
      estimate: null,
      loading: true,
      round: null,
    })),
    on(pokerOddsActions.answerRound, (state, action) => ({
      ...state,
      estimate: action.estimate,
      loading: true,
    })),
    on(pokerOddsActions.setCurrentRound, (state, action) => ({
      ...state,
      round: action.round,
      loading: false,
    })),
    on(pokerOddsActions.setRoundAnswer, (state, action) => ({
      ...state,
      answer: action.answer,
      loading: false,
    }))
  ),
});
export const { selectRound, selectAnswer, selectLoading } = pokerOddsFeature;

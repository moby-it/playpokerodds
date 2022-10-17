import { Round, RoundAnswerDto } from '@moby-it/ppo-core';
import { createFeature, createReducer, on } from '@ngrx/store';
import { estimateWasAccurate } from '../helpers';
import { pokerOddsActions } from './actions';
type RoundStatus = 'Initial' | 'Playing' | 'Completed';
type RoundAnswer = RoundAnswerDto & { didAccurateEstimate: boolean };
interface PokerOddsGameState {
  loading: boolean;
  round: Round | null;
  estimate: number | null;
  answer: RoundAnswer | null;
  roundStatus: RoundStatus;
}
const initialState: PokerOddsGameState = {
  loading: false,
  round: null,
  estimate: null,
  answer: null,
  roundStatus: 'Initial',
};
export const pokerOddsFeature = createFeature({
  name: 'PokerOdds',
  reducer: createReducer(
    initialState,
    on(pokerOddsActions.setLoading, (state, action) => ({
      ...state,
      loading: action.loading,
    })),
    on(pokerOddsActions.startNewRound, (state) => ({
      ...state,
      estimate: null,
      loading: true,
    })),
    on(pokerOddsActions.answerRound, (state, action) => ({
      ...state,
      estimate: action.estimate,
      loading: true,
    })),
    on(pokerOddsActions.setCurrentRound, (state, action) => ({
      ...state,
      round: action.round,
      answer: null,
      loading: false,
      roundStatus: 'Playing',
    })),
    on(pokerOddsActions.setRoundAnswer, (state, action) => ({
      ...state,
      answer: {
        ...action.answer,
        didAccurateEstimate: estimateWasAccurate(action.answer),
      },
      loading: false,
      roundStatus: 'Completed',
    }))
  ),
});
export const { selectRound, selectAnswer, selectLoading, selectRoundStatus } =
  pokerOddsFeature;

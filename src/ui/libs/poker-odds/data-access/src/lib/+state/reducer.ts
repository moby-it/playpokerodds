import { Round, RoundAnswerDto } from '@moby-it/ppo-core';
import { createFeature, createReducer, on } from '@ngrx/store';
import { UserScore } from '../dtos';
import { estimateWasAccurate } from '../helpers';
import { pokerOddsActions } from './actions';
type RoundStatus = 'Initial' | 'Playing' | 'Completed';
type RoundAnswer = RoundAnswerDto & { didAccurateEstimate: boolean };
interface PokerOddsGameState {
  fetchingRound: boolean;
  calculatingAnswer: boolean;
  fetchingLeaderboards: boolean;
  round: Round | null;
  estimate: number | null;
  answer: RoundAnswer | null;
  userScores: UserScore[] | null;
  roundStatus: RoundStatus;
}
const initialState: PokerOddsGameState = {
  fetchingRound: false,
  calculatingAnswer: false,
  fetchingLeaderboards: false,
  round: null,
  estimate: null,
  userScores: null,
  answer: null,
  roundStatus: 'Initial',
};
export const pokerOddsFeature = createFeature({
  name: 'PokerOdds',
  reducer: createReducer(
    initialState,
    on(pokerOddsActions.reset, () => ({ ...initialState })),
    on(pokerOddsActions.setLoading, (state, action) => ({
      ...state,
      loading: action.loading,
    })),
    on(pokerOddsActions.startNewRound, (state) => ({
      ...state,
      estimate: null,
      fetchingRound: true,
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
      fetchingRound: false,
      roundStatus: 'Playing',
    })),
    on(pokerOddsActions.answerRound, (state) => ({
      ...state,
      calculatingAnswer: true,
    })),
    on(pokerOddsActions.fetchLeaderboards, (state) => ({
      ...state,
      fetchingLeaderboards: true,
    })),
    on(pokerOddsActions.setLeaderboards, (state, action) => ({
      ...state,
      fetchingLeaderboards: false,
      userScores: action.scores,
    })),
    on(pokerOddsActions.setRoundAnswer, (state, action) => ({
      ...state,
      answer: {
        ...action.answer,
        didAccurateEstimate: estimateWasAccurate(action.answer),
      },
      calculatingAnswer: false,
      roundStatus: 'Completed',
    }))
  ),
});
export const {
  selectRound,
  selectAnswer,
  selectCalculatingAnswer,
  selectFetchingRound,
  selectRoundStatus,
  selectUserScores,
  selectFetchingLeaderboards,
} = pokerOddsFeature;

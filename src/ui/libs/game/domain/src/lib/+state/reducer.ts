import { Round } from '@moby-it/ppo-core';
import { createFeature, createReducer, on } from '@ngrx/store';
import { RoundAnswer } from '../dtos';
import { estimateWasAccurate } from '../helpers';
import { pokerOddsActions } from './actions';
type RoundStatus = 'Initial' | 'Playing' | 'Completed';
type RoundAnswerWithEstimate = RoundAnswer & { didAccurateEstimate: boolean };
interface GameUiState {
  fetchingRound: boolean;
  calculatingAnswer: boolean;
  roundId: string;
  round: Round | null;
  estimate: number | null;
  answer: RoundAnswerWithEstimate | null;
  roundStatus: RoundStatus;
  playWithRevealedCards: boolean;
}
const initialState: GameUiState = {
  fetchingRound: false,
  calculatingAnswer: false,
  roundId: '',
  round: null,
  estimate: null,
  answer: null,
  roundStatus: 'Initial',
  playWithRevealedCards: true,
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
      roundId: '',
    })),
    on(pokerOddsActions.answerRound, (state, action) => ({
      ...state,
      estimate: action.estimate,
      loading: true,
      calculatingAnswer: true,
    })),
    on(pokerOddsActions.setCurrentRound, (state, action) => ({
      ...state,
      round: action.round,
      answer: null,
      fetchingRound: false,
      roundStatus: 'Playing',
    })),
    on(pokerOddsActions.setRoundAnswer, (state, action) => ({
      ...state,
      answer: {
        ...action.answer,
        didAccurateEstimate: estimateWasAccurate(action.answer),
        roundId: action.answer.roundId,
      },
      calculatingAnswer: false,
      roundStatus: 'Completed',
    })),
    on(pokerOddsActions.togglePlayWithRevealedCards, (state) => ({
      ...state,
      playWithRevealedCards: !state.playWithRevealedCards,
    })),
    on(pokerOddsActions.setRoundId, (state, action) => ({
      ...state,
      roundId: action.id,
    }))
  ),
});
export const {
  selectRound,
  selectAnswer,
  selectCalculatingAnswer,
  selectFetchingRound,
  selectRoundStatus,
  selectPlayWithRevealedCards,
  selectRoundId,
} = pokerOddsFeature;

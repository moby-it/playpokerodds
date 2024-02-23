import { Round } from '@moby-it/poker-core';
import { createFeature, createReducer, on } from '@ngrx/store';
import { RoundAnswer, scoreIsAccurate } from '@ppo/round/domain';
import { pokerOddsActions } from './actions';
type RoundStatus = 'Initial' | 'Playing' | 'Completed';
type RoundAnswerWithEstimate = RoundAnswer & { didAccurateEstimate: boolean; };
interface PlayUiState {
  fetchingRound: boolean;
  calculatingAnswer: boolean;
  roundId: string;
  round: Round | null;
  estimate: number | null;
  answer: RoundAnswerWithEstimate | null;
  roundStatus: RoundStatus;
  playWithRevealedCards: boolean;
}
const initialState: PlayUiState = {
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
      roundStatus: 'Playing' as RoundStatus,
    })),
    on(pokerOddsActions.setRoundAnswer, (state, action) => ({
      ...state,
      answer: {
        ...action.answer,
        didAccurateEstimate: scoreIsAccurate(action.answer.score),
        roundId: action.answer.roundId,
      },
      calculatingAnswer: false,
      roundStatus: 'Completed' as RoundStatus,
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

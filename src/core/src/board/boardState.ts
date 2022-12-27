export enum BoardState {
  PreFlop,
  Flop,
  Turn,
  River,
}
export function openBoardCardsFromState(state: BoardState): BoardState {
  switch (state) {
    case BoardState.PreFlop:
      return 0;
    case BoardState.Flop:
      return 3;
    case BoardState.Turn:
      return 4;
    case BoardState.River:
      return 5;
  }
}
export function validateBoardState(payload: unknown): payload is BoardState {
  return typeof payload === 'number' && payload >= 0 && payload <= 3;
}

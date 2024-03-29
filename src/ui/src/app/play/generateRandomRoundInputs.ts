interface CreateRoundInputs {
  totalHands: number;
  totalKnownHands: number;
  boardState: BoardState;
}
enum BoardState {
  PreFlop = 0,
  Flop = 1,
  Turn = 2,
  River = 3
}
export function generateRandomRoundInputs(): CreateRoundInputs {
  const boardState = rng(BoardState.PreFlop, BoardState.Turn);
  const totalHands = rng(2, 5);
  const totalKnownHands = totalHands;
  return { boardState, totalHands, totalKnownHands };
}
function rng(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

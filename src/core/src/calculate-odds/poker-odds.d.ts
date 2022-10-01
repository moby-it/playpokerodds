declare module 'poker-odds' {
  import { Hand } from '../';
  import { Board } from '../board';
  interface HandChance {
    name: string;
    count: number;
  }
  export interface Equity {
    hand: Hand;
    count: number;
    wins: number;
    ties: number;
    handChances: HandChance[];
    favority: boolean;
  }
  export const calculateEquity: (
    hands: Hand[],
    board: Board,
    iterations = 200000,
    exhaustive = false
  ) => Equity[];
}

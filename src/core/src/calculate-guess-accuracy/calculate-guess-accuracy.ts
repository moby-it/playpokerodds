export const calculateGuessScore: (
  estimate: number
) => (handOdds: number) => number = estimate => (handOdds: number) =>
  Number((estimate - handOdds).toFixed(2));

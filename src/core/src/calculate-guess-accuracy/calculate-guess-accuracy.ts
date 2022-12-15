export function calculateGuessScore(
  estimate: number,
  handOdds: number
): number {
  return Number((estimate - handOdds).toFixed(2));
}

export function createRouteUrl(roundId: string): string {
  return `${window.origin}/play/${roundId}`;
}

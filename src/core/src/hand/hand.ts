import { validateCard } from '../card';

export type Hand = [string, string];
export const UnknownHand: Hand = ['..', '..'];
export function validateHand(payload: unknown): payload is Hand {
  return (
    Array.isArray(payload) &&
    payload.length === 2 &&
    validateCard(payload[0]) &&
    validateCard(payload[1])
  );
}

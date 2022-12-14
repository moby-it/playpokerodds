import { fetchUserRounds } from './fetchUserRounds';
import { validatePayload } from './validatePayload';

export * from './validatePayload';
export const fetchUserRoundsEndpoint = [validatePayload, fetchUserRounds];

import { validateAdmin } from '../../auth/common';
import { fetchEvents } from './fetchEvents';

export const fetchEventsEndpoint = [validateAdmin, fetchEvents];

import { TaskEither } from 'fp-ts/lib/TaskEither';
import { EventType } from './events';

export interface EventsRepositoryModel {
  saveEvent: (
    eventType: EventType,
    payload: unknown
  ) => TaskEither<Error, Event>;
}

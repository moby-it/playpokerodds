import { EventType } from './events';

export interface Event<T> {
  id: string;
  type: EventType;
  payload: T;
}

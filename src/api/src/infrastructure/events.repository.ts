import { EventsRepositoryModel, EventType } from '@domain';
import { prisma } from '@infrastructure';
import { tryCatch } from 'fp-ts/lib/TaskEither';
import { handleDbError } from './common';

const saveEvent = (eventType: EventType, payload: unknown) =>
  tryCatch(async () => {
    const result = await prisma.event.create({
      data: { payload: JSON.stringify(payload), type: eventType },
    });
  }, handleDbError);
export const EventsRepository: EventsRepositoryModel = {
  saveEvent,
};

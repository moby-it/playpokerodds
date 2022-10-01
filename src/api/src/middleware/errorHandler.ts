import { EventType } from '@moby-it/poker-core';
import { Application, NextFunction, Request, Response } from 'express';
import prisma from 'prisma';

export async function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  await prisma.event.create({
    data: {
      type: EventType.UNKNOWN_ERROR,
      payload: err.message,
    },
  });
  res.status(500).send(err.message);
}
export function registerErrorHandlers(app: Application) {
  app.use(globalErrorHandler);
}

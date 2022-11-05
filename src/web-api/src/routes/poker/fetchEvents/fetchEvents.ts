import { NextFunction, Request, Response } from 'express';
import prisma from 'prisma';

export async function fetchEvents(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const events = await prisma.event.findMany({
    orderBy: { timestamp: 'desc' },
  });
  res.status(200).send(events);
}

import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import prisma from 'prisma';
import { EventType } from 'shared';

export async function logLogin(
  req: Request,
  res: Response<unknown, User>,
  next: NextFunction
) {
  await prisma.event.create({
    data: {
      type: EventType.USER_LOGGED_IN,
      payload: { email: res.locals.email },
    },
  });
  next();
}

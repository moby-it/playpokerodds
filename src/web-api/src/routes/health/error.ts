import { Request, Response } from 'express';
import prisma from 'prisma';
import { EventType } from 'shared';

export async function logError(req: Request, res: Response) {
  try {
    const errorMessage = req.body;
    await prisma.event.create({
      data: {
        type: EventType.UI_ERROR,
        payload: errorMessage,
      },
    });
    console.log('Error logged from ui', errorMessage);
    res.sendStatus(201);
    return;
  } catch (e) {
    res.status(500);
  }
}

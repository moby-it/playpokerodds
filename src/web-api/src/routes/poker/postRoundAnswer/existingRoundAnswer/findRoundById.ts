import { Round } from '@moby-it/ppo-core';
import { NextFunction, Request, Response } from 'express';
import { isLeft } from 'fp-ts/lib/Either';
import prisma from 'prisma';
import { ExistingAnswerDto } from './existingAnswer.dto';

export async function findRoundById(
  req: Request,
  res: Response<
    unknown,
    { dto: ExistingAnswerDto; round: Round; odds: number; roundId: string }
  >,
  next: NextFunction
) {
  const roundId = res.locals.dto.roundId;
  if (!roundId) {
    res.sendStatus(400);
    return;
  }
  const prismaRound = await prisma.round.findFirst({ where: { id: roundId } });
  const round = Round.decode(prismaRound);
  if (isLeft(round)) throw new Error('invalid round front db');
  if (!prismaRound) {
    res.sendStatus(404);
    return;
  } else {
    res.locals.round = round.right;
    res.locals.roundId = prismaRound.id;
    res.locals.odds = Number(prismaRound.odds);
    next();
  }
}

import { Board, Hand, Round } from '@moby-it/poker-core';
import { NextFunction, Request, Response } from 'express';
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
  const round = await prisma.round.findFirst({ where: { id: roundId } });
  if (!round) {
    res.sendStatus(404);
    return;
  }
  res.locals.round = {
    board: round.board as Board,
    myHand: round.myHand as Hand,
    opponentsHands: round.opponentsHands as Hand[],
  };
  res.locals.roundId = round.id;
  res.locals.odds = Number(round.odds);
  next();
}

import { Board, Hand, Round } from '@moby-it/ppo-core';
import { NextFunction, Request, Response } from 'express';
import prisma from 'prisma';

export async function findRoundById(
  req: Request,
  res: Response<Omit<Round, 'odds' | 'estimate' | 'userId'>>,
  next: NextFunction
) {
  const roundId = req.params['id'];
  if (!roundId) {
    res.sendStatus(400);
    return;
  }
  const round = await prisma.round.findFirst({ where: { id: roundId } });
  if (!round) {
    res.sendStatus(404);
    return;
  }
  res.send({
    board: round.board as Board,
    myHand: round.myHand as Hand,
    opponentsHands: round.opponentsHands as Hand[],
  });
}

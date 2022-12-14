import { Round } from '@moby-it/ppo-core';
import { NextFunction, Request, Response } from 'express';
import { isLeft } from 'fp-ts/lib/Either';
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
  const prismaRound = Round.decode(
    await prisma.round.findFirst({ where: { id: roundId } })
  );
  if (isLeft(prismaRound)) {
    res.sendStatus(404);
    return;
  } else {
    const round = prismaRound.right;
    res.send({
      board: round.board,
      myHand: round.myHand,
      opponentsHands: round.opponentsHands,
    });
  }
}

import { RoundAnswer } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import prisma from 'prisma';
import { DecodedJwt } from 'shared';

export async function fetchUserRounds(
  req: Request,
  res: Response<RoundAnswer[], DecodedJwt>,
  next: NextFunction
) {
  const user = res.locals;
  const roundAnswers = await prisma.roundAnswer.findMany({
    where: { userId: user.userId },
    include: {
      round: true,
    },
  });

  res.status(200).send(roundAnswers);
  return;
}

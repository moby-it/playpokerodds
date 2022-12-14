import { Round } from '@moby-it/ppo-core';
import { NextFunction, Request, Response } from 'express';
import { isRight } from 'fp-ts/lib/Either';
import prisma from 'prisma';
import { DecodedJwt } from 'shared';

export async function fetchUserRounds(
  req: Request,
  res: Response<Round[], DecodedJwt>,
  next: NextFunction
) {
  const user = res.locals;
  const queryResult = await prisma.roundAnswer.findMany({
    where: { userId: user.userId },
    include: {
      round: true,
    },
  });
  const rounds: Round[] = queryResult.map(r => {
    const roundEndcoded = Round.decode(r.round);
    if (isRight(roundEndcoded)) {
      return roundEndcoded.right;
    } else {
      throw new Error('failed to decode round');
    }
  });
  res.status(200).send(rounds);
  return;
}

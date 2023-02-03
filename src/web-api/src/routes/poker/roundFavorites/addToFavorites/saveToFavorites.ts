import { NextFunction, Request, Response } from 'express';
import prisma from 'prisma';
import { DecodedJwt } from 'shared';

export async function saveToFavorites(
  req: Request,
  res: Response<unknown, { user: DecodedJwt; roundId: string }>,
  next: NextFunction
) {
  const { user, roundId } = res.locals;
  const isAlreadyFavorite = await prisma.userFavoriteRounds.count({
    where: { roundId, userId: user.userId },
  });
  if (isAlreadyFavorite) {
    return res.sendStatus(304);
  }
  await prisma.userFavoriteRounds.create({
    data: {
      roundId,
      userId: user.userId,
    },
  });
  res.sendStatus(204);
}

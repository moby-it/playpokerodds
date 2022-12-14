import { NextFunction, Request, Response } from 'express';
import prisma from 'prisma';
import { DecodedJwt } from 'shared';

export async function saveToFavorites(
  req: Request,
  res: Response<unknown, { user: DecodedJwt; roundId: string }>,
  next: NextFunction
) {
  const { user, roundId } = res.locals;
  await prisma.roundAnswer.updateMany({
    where: { roundId, userId: user.userId },
    data: {
      isFavorite: true,
    },
  });
  res.sendStatus(204);
}
